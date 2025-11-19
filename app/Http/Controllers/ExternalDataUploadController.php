<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response; 

class ExternalDataUploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreExternalDataUploadRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ExternalDataUpload $externalDataUpload)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //
          // dd(1);
            return Inertia::render('ExternalDataUpload/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
       
    }
    public function view(Request $request)
    {
        //
          // dd(1);
            return Inertia::render('ExternalDataUpload/View', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
            ]);
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExternalDataUploadRequest $request, ExternalDataUpload $externalDataUpload)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExternalDataUpload $externalDataUpload)
    {
        //
    }
}
