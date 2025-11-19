<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExternalDataUploadController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\CandidateController;
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

Route::get('/dashboard', function () {
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
    // Route::get('/JobPosting', [JobPostingController::class, 'index'])->name('jobposting.index');
    Route::get('/JobPosting', [JobPostingController::class, 'edit'])->name('jobposting.edit');
    Route::get('/JobPosting/View', [JobPostingController::class, 'view'])->name('jobposting.view');


    // Route::get('/JobPosting', [JobPostingController::class, 'update'])->name('jobposting.update');
    // Route::get('/JobPosting', [JobPostingController::class, 'destroy'])->name('jobposting.destroy');

    // Candidate
    Route::get('/Candidate', [CandidateController::class, 'index'])->name('candidate.index');    
    Route::get('/Candidate', [CandidateController::class, 'edit'])->name('candidate.edit');
    Route::get('/Candidate', [CandidateController::class, 'update'])->name('candidate.update');
    Route::get('/Candidate', [CandidateController::class, 'destroy'])->name('candidate.destroy');

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
});

require __DIR__.'/auth.php';
