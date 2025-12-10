<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\StoreCandidateRequest;
use App\Http\Requests\UpdateCandidateRequest;
use App\Mail\CandidateMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Candidate;
use App\Models\Origin;
use App\Models\Documents;
use App\Models\Feedback;
use App\Models\Comment;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;



class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Candidate::with('origin'); // Load origin relationship

        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'LIKE', "%{$request->search}%")
                  ->orWhere('email', 'LIKE', "%{$request->search}%")
                  ->orWhere('mobile', 'LIKE', "%{$request->search}%");
            });
        }

        // Status filter
        if ($request->status) {
            $query->where('status', $request->status);
        }

        // Origin filter
        if ($request->origin_id) {
            $query->where('origin_id', $request->origin_id);
        }

        // Sorting
        $query->orderBy(
            $request->sort_by ?? 'id',
            $request->sort_order ?? 'desc'
        );

        // Pagination
        $candidates = $query->paginate(10)->through(function ($c) {
            $c->is_new = $c->created_at->gt(now()->subDays(1));
            return $c;
        });

        $totalCount = Candidate::count(); // ALL records
        $filteredCount = $query->count(); // After applying filters
        $statusCounts = Candidate::select('status')
        ->selectRaw('COUNT(*) as count')
        ->groupBy('status')
        ->pluck('count', 'status');

        if ($request->sort_date === 'new') {
            $query->orderBy('created_at', 'desc');
        } elseif ($request->sort_date === 'old') {
            $query->orderBy('created_at', 'asc');
        }

        return Inertia::render('Candidate/Index', [
            'candidates' => $candidates,
            // Dropdown filters
            'statuses' => ['Applied','Pending','In Review','Interviewed','Shortlisted','Selected','Rejected','Hired'],
            'origins' => Origin::all(),
            // Active filters for UI
            'filters' => $request->only([
                'search',
                'status',
                'origin_id',
                'sort_by',
                'sort_order'
            ]),
            'totalCount' => $totalCount,
            'filteredCount' => $filteredCount,
            'statusCounts' => $statusCounts
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $origins = Origin::all();
        return Inertia::render('Candidate/Create', [
            'origins' => $origins,
            'statuses' => ['Applied','Pending','In Review','Interviewed','Shortlisted','Selected','Rejected','Hired'],
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:candidates,email',
            'mobile' => 'required|string|max:20',
            'address' => 'nullable|string',
            'status' => 'required|in:Applied,Pending,In Review,Interviewed,Shortlisted,Selected,Rejected,Hired',
            'date_of_apply' => 'required|date',
            'origin_id' => 'required|string|exists:origins,id',

            // Attachments (optional)
            'attachments.*' => 'nullable|file|max:5120',
        ]);

        // Create candidate first
        $candidate = Candidate::create($validated);

        // If attachments exist, store them
        if ($request->hasFile('attachments')) {

            foreach ($request->file('attachments') as $index => $file) {

                // Folder = candidates/{ID}/
                $folder = 'candidates/' . $candidate->id;

                // Store file inside storage/app/public/candidates/{id}/
                $path = $file->store($folder, 'public');

                // Get attachment type sent from frontend
                $fileType = $file->getClientOriginalExtension();

                // Save each file as a document
                Documents::create([
                    'candidate_id' => $candidate->id,
                    'file_path' => $path,
                    'file_type' => $fileType,
                    'status' => 1
                ]);
            }
        }

        return redirect()
            ->route('candidate.index')
            ->with('success', 'Candidate created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Candidate $candidate)
    {
        $candidate = Candidate::with('origin')->with('documents')->findOrFail($candidate->id);
        return Inertia::render('Candidate/Show', [
            'candidate' => $candidate,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        $candidate = Candidate::with('documents')->findOrFail($id);
        $user = Auth::user();

        if (!$user) {
            return back()->with('error', 'User not found.');
        }

        try {
            return Inertia::render('Candidate/Edit', [
                'candidate' => $candidate,
                'user' => $user,
                'statuses' => ['Applied','Pending','In Review','Interviewed','Shortlisted','Selected','Rejected','Hired'],
                'origins' => Origin::all(),
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Unable to load candidate edit form.');
        }
    }


    public function view(Request $request): Response
    {

        // $JobPosting = JobPosting::all();
        // dd($JobPosting);
        
        return Inertia::render('Candidate/View', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Candidate $candidate)
    {
        $candidate = Candidate::findOrFail($candidate->id);

        // Validate candidate fields
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:candidates,email,' . $candidate->id,
            'mobile' => 'required|string|max:20',
            'address' => 'nullable|string',
            'status' => 'required|in:Applied,Pending,In Review,Interviewed,Shortlisted,Selected,Rejected,Hired',
            'date_of_apply' => 'required|date',
            'origin_id' => 'required|integer|exists:origins,id',

            // allow all file types
            'attachments.*' => 'nullable|file|max:10240', // 10MB max

            // IDs of attachments to delete
            'delete_attachments' => 'array',
            'delete_attachments.*' => 'integer|exists:documents,id',
        ]);

        // Update candidate info
        $candidate->update($validated);

        /* ----------------------------------------------------
            DELETE SELECTED ATTACHMENTS
        ---------------------------------------------------- */
        if ($request->delete_attachments) {
            foreach ($request->delete_attachments as $docId) {
                $file = Documents::find($docId);

                if ($file) {
                    // Remove actual file
                    if (Storage::disk('public')->exists($file->file_path)) {
                        Storage::disk('public')->delete($file->file_path);
                    }

                    // Delete DB row
                    $file->delete();
                }
            }
        }

        /* ----------------------------------------------------
            UPLOAD NEW ATTACHMENTS
        ---------------------------------------------------- */
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {

                // Folder: candidates/{id}
                $folder = 'candidates/' . $candidate->id;
                $path = $file->store($folder, 'public');

                // Real MIME type
                $mimeType = $file->getClientMimeType();

                Documents::create([
                    'candidate_id' => $candidate->id,
                    'file_path'    => $path,
                    'file_type'    => $mimeType, // real MIME like "application/pdf"
                    'status'       => 1,
                ]);
            }
        }

        return back()->with('success', 'Candidate updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     */  

    public function destroy(Candidate $candidate)
    {
        // Delete all related documents files
        if ($candidate->documents) {
            foreach ($candidate->documents as $doc) {
                if (Storage::disk('public')->exists($doc->file_path)) {
                    Storage::disk('public')->delete($doc->file_path);
                }
            }
        }

        // Optionally, delete the candidate's folder if files are stored in a dedicated folder
        $folder = "candidates/{$candidate->id}";
        if (Storage::disk('public')->exists($folder)) {
            Storage::disk('public')->deleteDirectory($folder);
        }

        // Delete candidate record
        $candidate->delete();

        return redirect()
            ->route('candidate.index')
            ->with('success', 'Candidate and all related files deleted successfully.');
    }


    public function deleteAttachment($id)
    {
        $file = Documents::findOrFail($id);

        if (Storage::disk('public')->exists($file->file_path)) {
            Storage::disk('public')->delete($file->file_path);
        }

        $file->delete();

        return back()->with('success', 'Attachment removed successfully.');

    }

    public function search(Request $request)
    {
        $candidates = Candidate::when($request->search, function ($q) use ($request) {
            $q->where('name', 'LIKE', "%{$request->search}%")
              ->orWhere('email', 'LIKE', "%{$request->search}%")
              ->orWhere('mobile', 'LIKE', "%{$request->search}%");
        })
        ->paginate(10);

        return [
            'data' => $candidates
        ];
    }

    public function updateStatus(Request $request, Candidate $candidate)
    {
        $request->validate([
            'status' => 'required|string|in:Applied,Pending,In Review,Interviewed,Shortlisted,Selected,Rejected,Hired',
        ]);

        $candidate->status = $request->input('status');
        $candidate->save();

         return back()->with('success', 'Status updated successfully.');
    }

    public function addFeedback($id, Request $request)
    {
        $request->validate(['message' => 'required']);

        Feedback::create([
            'candidate_id' => $id,
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        return back()->with('success', 'Feedback added');
    }

    public function deleteFeedback($id)
    {
        Feedback::findOrFail($id)->delete();
        return back()->with('success', 'Feedback removed');
    }


    public function addComment($id, Request $request)
    {
        $request->validate(['message' => 'required']);

        Comment::create([
            'candidate_id' => $id,
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        return back()->with('success', 'Comment added');
    }

    public function deleteComment($id)
    {
        Comment::findOrFail($id)->delete();
        return back()->with('success', 'Comment removed');
    }

    public function sendMail(Request $request, $id)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $candidate = Candidate::findOrFail($id);

        // Send email using Mailable
        Mail::to($candidate->email)->send(new CandidateMail($request->subject, $request->body));

        return response()->json(['success' => true, 'message' => 'Email sent successfully']);
    }

    public function sendWhatsApp(Request $request, Candidate $candidate)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $phone = $candidate->whatsapp_number; // make sure you have it in DB

        // Example using WhatsApp API (like Twilio, WhatsApp Cloud API)
        // Here we just simulate sending
        // In real usage, call your API or package
        // Example: WhatsAppService::send($phone, $request->message);

        // For demo, just return success
        return back()->with('success', 'WhatsApp message sent!');
    }
}
