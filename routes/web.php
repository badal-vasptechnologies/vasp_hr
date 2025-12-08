<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExternalDataUploadController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CandidateApplicationProcessController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportsController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/Dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // ExternalDataUpload
    Route::get('/ExternalDataUpload', [ExternalDataUploadController::class, 'index'])->name('externaldataupload.index');
    Route::get('/ExternalDataUpload', [ExternalDataUploadController::class, 'edit'])->name('externaldataupload.edit');
    Route::get('/ExternalDataUpload/View', [ExternalDataUploadController::class, 'view'])->name('externaldataupload.view');

    Route::delete('/ExternalDataUpload', [ExternalDataUploadController::class, 'destroy'])->name('externaldataupload.destroy');

    // JobPosting
    Route::get('/JobPosting', [JobPostingController::class, 'index'])->name('jobposting.index');
    Route::get('/JobPosting/Create', [JobPostingController::class, 'create'])->name('jobposting.create');
    Route::post('/JobPosting', [JobPostingController::class, 'store'])->name('jobposting.store');
    Route::put('/JobPosting/{jobPosting}', [JobPostingController::class, 'update'])->name('jobposting.update');
    Route::get('/JobPosting/{jobposting}', [JobPostingController::class, 'show'])->name('jobposting.show');
    Route::get('/JobPosting/{jobposting}/Edit', [JobPostingController::class, 'edit'])->name('jobposting.edit');
    Route::delete('/JobPosting/{jobposting}', [JobPostingController::class, 'destroy'])->name('jobposting.destroy');
    Route::post('/JobPosting/{jobposting}/Update-Status', [JobPostingController::class, 'updateStatus'])->name('jobposting.updateStatus');

     // CandidateApplicationProcess
    //  Route::get('/CandidateApplicationProcess', [CandidateApplicationProcessController::class, 'index'])->name('candidateapplicationprocess.index');    
     Route::get('/CandidateApplicationProcess', [CandidateApplicationProcessController::class, 'edit'])->name('candidateapplicationprocess.edit');
    //  Route::get('/CandidateApplicationProcess', [CandidateApplicationProcessController::class, 'update'])->name('candidateapplicationprocess.update');
    //  Route::get('/CandidateApplicationProcess', [CandidateApplicationProcessController::class, 'destroy'])->name('candidateapplicationprocess.destroy');

    
     // CandidateDocumentProcess
    //  Route::get('/CandidateApplicationProcess', [CandidateApplicationProcessController::class, 'index'])->name('candidateapplicationprocess.index');    
    Route::get('/CandidateApplicationProcess', [CandidateApplicationProcessController::class, 'edit'])->name('candidateapplicationprocess.edit');
    //  Route::get('/CandidateApplicationProcess', [CandidateApplicationProcessController::class, 'update'])->name('candidateapplicationprocess.update');
    //  Route::get('/CandidateApplicationProcess', [CandidateApplicationProcessController::class, 'destroy'])->name('candidateapplicationprocess.destroy');

    // Candidate
    Route::get('/Candidate', [CandidateController::class, 'index'])->name('candidate.index');
    Route::get('/Candidate/Create', [CandidateController::class, 'create'])->name('candidate.create');
    Route::post('/Candidate', [CandidateController::class, 'store'])->name('candidate.store');
    Route::put('/Candidate/{candidate}', [CandidateController::class, 'update'])->name('candidate.update');
    Route::get('/Candidate/{candidate}', [CandidateController::class, 'show'])->name('candidate.show');
    Route::get('/Candidate/{candidate}/Edit', [CandidateController::class, 'edit'])->name('candidate.edit');
    Route::delete('/Candidate/{candidate}', [CandidateController::class, 'destroy'])->name('candidate.destroy');
    Route::post('/Candidate/{candidate}/Update-Status', [CandidateController::class, 'updateStatus'])->name('candidate.updateStatus');

    // Application
    Route::get('/Application', [ApplicationController::class, 'index'])->name('application.index');
    Route::get('/Application', [ApplicationController::class, 'edit'])->name('application.edit');
    // Route::get('/Application', [ApplicationController::class, 'update'])->name('application.update');
    // Route::get('/Application', [ApplicationController::class, 'destroy'])->name('application.destroy');

    // Documents
    Route::get('/Documents', [DocumentsController::class, 'index'])->name('documents.index');
    Route::get('/Documents', [DocumentsController::class, 'edit'])->name('documents.edit');
    Route::get('/Documents', [DocumentsController::class, 'update'])->name('documents.update');
    Route::get('/Documents', [DocumentsController::class, 'destroy'])->name('documents.destroy');

    // Reports
    Route::get('/Reports', [ReportsController::class, 'index'])->name('reports.index');

    Route::apiResource('departments', DepartmentController::class);

});

require __DIR__.'/auth.php';
