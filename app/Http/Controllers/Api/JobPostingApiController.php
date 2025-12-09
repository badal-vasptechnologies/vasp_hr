<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JobPostingApiController extends Controller
{
    // GET all job postings with pagination
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $query = JobPosting::query();

        // Optional filters
        if ($request->has('department')) {
            $query->where('department', $request->department);
        }

        if ($request->has('work_mode')) {
            $query->where('work_mode', $request->work_mode);
        }

        // Pagination
        $jobs = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'status' => true,
            'data' => $jobs->items(),
            'meta' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
            ],
        ]);
    }

    // GET single job posting
    public function show($id)
    {
        $job = JobPosting::find($id);

        if (!$job) {
            return response()->json([
                'status' => false,
                'message' => 'Job not found',
            ], 404);
        }

        return response()->json(['status' => true, 'data' => $job]);
    }

    // POST create job posting with validation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'work_mode' => ['required', Rule::in(['Onsite','Offsite','Hybrid'])],
        ]);

        $job = JobPosting::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Job created successfully',
            'data' => $job
        ], 201);
    }

    // PUT update job posting with validation
    public function update(Request $request, $id)
    {
        $job = JobPosting::find($id);

        if (!$job) {
            return response()->json([
                'status' => false,
                'message' => 'Job not found',
            ], 404);
        }

        $validated = $request->validate([
            'job_title' => 'sometimes|required|string|max:255',
            'department' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'work_mode' => ['sometimes','required', Rule::in(['Onsite','Offsite','Hybrid'])],
        ]);

        $job->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Job updated successfully',
            'data' => $job
        ]);
    }

    // DELETE job posting
    public function destroy($id)
    {
        $job = JobPosting::find($id);

        if (!$job) {
            return response()->json([
                'status' => false,
                'message' => 'Job not found',
            ], 404);
        }

        $job->delete();

        return response()->json([
            'status' => true,
            'message' => 'Job deleted successfully',
        ]);
    }
}
