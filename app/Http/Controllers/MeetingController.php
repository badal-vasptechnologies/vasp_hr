<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidate;
use App\Models\Meeting;
use App\Services\ZoomService;
use App\Services\GoogleService;
use Inertia\Inertia;

class MeetingController extends Controller
{
	public function show($id)
	{
	    $meeting = Meeting::with(['candidate.comments.user'])->findOrFail($id);
	    // dd($meeting);
	    return Inertia::render('Meetings/Show', [
	        'meeting' => $meeting
	    ]);
	}

	public function destroy($id)
	{
	    $meeting = Meeting::findOrFail($id);
	    $meeting->delete();

	    return back()->with('success', 'Meeting deleted successfully');
	}


    public function schedule(Request $request, Candidate $candidate, ZoomService $zoom, GoogleService $google)
	{
	    $request->validate([
	        'platform' => 'required',
	        'start_time' => 'required|date',
	    ]);

	    if ($request->platform === "zoom") {
	        $z = $zoom->createMeeting("Interview with {$candidate->name}", $request->start_time);

	        $meeting = Meeting::create([
	            'candidate_id' => $candidate->id,
	            'platform' => 'zoom',
	            'meeting_id' => $z['id'],
	            'join_url' => $z['join_url'],
	            'start_url' => $z['start_url'],
	            'start_time' => $request->start_time,
	        ]);
	    } else {
	        $g = $google->createMeet("Interview with {$candidate->name}", $request->start_time);

	        $meeting = Meeting::create([
	            'candidate_id' => $candidate->id,
	            'platform' => 'google',
	            'meeting_id' => $g['meeting_id'],
	            'join_url' => $g['join_url'],
	            'start_time' => $request->start_time,
	        ]);
	    }

	    // Send email to candidate (optional)
	    // Mail::to($candidate->email)->send(new MeetingMail($meeting));

	    return back()->with("success", "Meeting scheduled successfully");
	}

}
