<?php

namespace App\Http\Controllers;


use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\Candidate;
use App\Models\Origin;
use App\Models\Documents;
use Inertia\Inertia;
use Inertia\Response;

class CandidateApplicationProcessController extends Controller
{
    
    //   Display a listing of the resource.
    public function index(Request $request)
    {
        $query = Candidate::with([
            'documents',
            'meetings',
            'origin',
            'feedbacks.user',  // Load feedback + user who wrote it
            'comments.user'    // Load comments + user who wrote it
        ]);

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('email', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('mobile', 'LIKE', '%' . $request->search . '%');
            });
        }

        $sortBy = $request->sort_by ?? 'id';
        $sortOrder = $request->sort_order ?? 'desc';

        $query->orderBy($sortBy, $sortOrder);

        $candidates = $query->paginate(10)->withQueryString()->through(function ($c) {
            $c->is_new = $c->created_at->gt(now()->subDays(1));
            return $c;
        });
        
        return Inertia::render('CandidateApplicationProcess/Index', [
            'candidates' => $candidates,
            'statuses' => [
                'Applied','Pending','In Review','Interviewed',
                'Shortlisted','Selected','Rejected','Hired'
            ],
            'filters' => [
                'search' => $request->search
            ],
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobPostingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(JobPosting $jobPosting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request): Response
    {
        // dd(1);
        return Inertia::render('CandidateApplicationProcess/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // public function view(Request $request): Response
    // {
    //     dd(1);
    //     return Inertia::render('JobPosting/View', [
    //         'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
    //         'status' => session('status'),
    //     ]);
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobPostingRequest $request, JobPosting $jobPosting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobPosting $jobPosting)
    {
        //
    }
}
