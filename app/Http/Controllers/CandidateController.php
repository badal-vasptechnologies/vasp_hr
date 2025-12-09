<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\StoreCandidateRequest;
use App\Http\Requests\UpdateCandidateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Candidate;
use App\Models\Origin;
use Inertia\Inertia;
use Inertia\Response;

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
            'statuses' => ['Pending', 'Shortlisted', 'Rejected', 'Selected'],
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
            'statuses' => ['Pending', 'Shortlisted', 'Rejected', 'Selected'],
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:candidates,email',
            'mobile' => 'required|string|max:20',
            'address' => 'nullable|string',
            'status' => 'required|in:Pending,Shortlisted,Rejected,Selected',
            'date_of_apply' => 'required|date',
            'origin_id' => 'required|integer',
        ]);

        Candidate::create($validated);

        return redirect()->route('candidate.index')
                         ->with('success', 'Candidate created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Candidate $candidate)
    {
        $candidate = Candidate::with('origin')->findOrFail($candidate->id);
        return Inertia::render('Candidate/Show', [
            'candidate' => $candidate,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        $candidate = Candidate::findOrFail($id);
        $user = Auth::user();

        if (!$user) {
            return back()->with('error', 'User not found.');
        }

        try {
            return Inertia::render('Candidate/Edit', [
                'candidate' => $candidate,
                'user' => $user,

                // Dropdowns
                'statuses' => ['Pending', 'Shortlisted', 'Rejected', 'Selected'],
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

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:candidates,email,' . $candidate->id,
            'mobile' => 'required|string|max:20',
            'address' => 'nullable|string',
            'status' => 'required|in:Pending,Shortlisted,Rejected,Selected',
            'date_of_apply' => 'required|date',
            'origin_id' => 'required|integer',
        ]);

        $candidate->update($validated);

        return redirect()->route('candidate.index')
                         ->with('success', 'Candidate updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidate $candidate)
    {
        $candidate->delete();
        return redirect()
            ->route('candidate.index')
            ->with('success', 'Candidate deleted successfully.');
    }
}
