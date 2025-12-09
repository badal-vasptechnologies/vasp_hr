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
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\SettingController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


// Welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
    ]);
});


// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Admin dashboard
    Route::get('/Dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
});

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/reset-password', [ProfileController::class, 'resetPassword'])->name('profile.resetpassword');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // ExternalDataUpload
    Route::prefix('External-Upload')->group(function () {
        Route::get('/Import', [ExternalDataUploadController::class, 'importPage'])->name('candidate.import.page');
        Route::post('/Import', [ExternalDataUploadController::class, 'import'])->name('candidate.import');
    });

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


    // Setting
    Route::get('/Settings', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/Settings/Origin', [SettingController::class, 'storeOrigin'])->name('setting.origin.store');
    Route::delete('/Settings/Origin/{id}', [SettingController::class, 'deleteOrigin'])->name('setting.origin.delete');
    Route::put('/Settings/Origin/{id}', [SettingController::class, 'updateOrigin'])
    ->name('setting.origin.update');

    // DEPARTMENTS
    Route::post('/Settings/Department', [SettingController::class, 'storeDepartment'])->name('setting.department.store');
    Route::delete('/Settings/Department/{id}', [SettingController::class, 'deleteDepartment'])->name('setting.department.delete');

    // LOCATIONS
    Route::post('/Settings/Location', [SettingController::class, 'storeLocation'])->name('setting.location.store');
    Route::delete('/Settings/Location/{id}', [SettingController::class, 'deleteLocation'])->name('setting.location.delete');

    // WORK MODES
    Route::post('/Settings/Workmode', [SettingController::class, 'storeWorkMode'])->name('setting.workmode.store');
    Route::delete('/Settings/Workmode/{id}', [SettingController::class, 'deleteWorkMode'])->name('setting.workmode.delete');

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
