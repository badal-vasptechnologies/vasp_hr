<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\JobPosting;
use App\Models\Department;
use App\Models\Location;
use App\Models\Workmode;

class JobPostingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = JobPosting::query();

        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('job_title', 'LIKE', "%{$request->search}%")
                  ->orWhere('location', 'LIKE', "%{$request->search}%");
            });
        }

        // Filters
        if ($request->department) $query->where('department', $request->department);
        if ($request->location) $query->where('location', $request->location);
        if ($request->work_mode) $query->where('work_mode', $request->work_mode);
        if ($request->status) $query->where('status', $request->status);

        // Sorting
        $query->orderBy($request->sort_by ?? 'id', $request->sort_order ?? 'desc');

        $jobpostings = $query->paginate(10)->withQueryString();

        return Inertia::render('JobPosting/Index', [
            'jobposting' => $jobpostings,
            'departments' => Department::all(),
            'locations' => Location::all(),
            'workmodes' => Workmode::all(),
            'filters' => $request->only([
                'search', 'department', 'location', 'work_mode', 'sort_by', 'sort_order'
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        if (!$user) return back()->with('error', 'User not found.');

        try {
            return Inertia::render('JobPosting/Create', [
                'user' => $user,
                'departments' => Department::all(),
                'locations' => Location::all(),
                'workmodes' => Workmode::all(),
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Unable to load job posting form.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title'   => 'required|string|max:255',
            'department'  => 'required|string|max:255',
            'location'    => 'required|string|max:255',
            'description' => 'nullable|string',
            'work_mode'   => 'required|in:Onsite,Offsite',
            'start_date'  => 'required|date',
        ]);

        JobPosting::create($validated);

        return redirect()
            ->route('jobposting.index')
            ->with('success', 'Job posting created successfully.');
    }

    /**
     * Display a single job posting.
     */
    public function show(JobPosting $jobposting)
    {
        if (!Auth::check()) return back()->with('error', 'User not found.');

        try {
            return Inertia::render('JobPosting/Show', [
                'jobposting' => $jobposting,
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Unable to load job posting.');
        }
    }

    /**
     * Show the form for editing.
     */
    public function edit(Request $request, $id)
    {
        $jobposting = JobPosting::findOrFail($id);

        // Load dropdown data
        $locations = Location::all(['id', 'name']);
        $departments = Department::all(['id', 'name']);
        $workmodes = WorkMode::all(['id', 'name']);
        $user = Auth::user();

        if (!$user) return back()->with('error', 'User not found.');

        try {
            return Inertia::render('JobPosting/Edit', [
                'jobposting' => $jobposting,
                'user' => $user,
                'departments' => Department::all(),
                'locations' => Location::all(),
                'workmodes' => Workmode::all(),
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Unable to load job posting form.');
        }
    }


    /**
     * Update the resource.
     */
    public function update(Request $request, JobPosting $jobPosting)
    {
        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'work_mode' => 'required|in:Onsite,Offsite',
            'start_date' => 'required|date',
        ]);

        $jobPosting->update($validated);

        return back()->with('success', 'Job posting updated successfully.');
    }

    /**
     * Delete the resource.
     */
    public function destroy(JobPosting $jobposting)
    {
        $jobposting->delete();

        return redirect()
            ->route('jobposting.index')
            ->with('success', 'Job deleted successfully.');
    }

    /**
     * Toggle job status (Active/Inactive).
     */
    public function updateStatus(JobPosting $jobposting)
    {
        try {
            $jobposting->status = $jobposting->status == 1 ? 0 : 1;
            $jobposting->save();

            return back()->with('success', 'Job status updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update job status.');
        }
    }
}
