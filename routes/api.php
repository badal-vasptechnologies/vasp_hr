<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JobPostingApiController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// API v1 group
Route::prefix('v1')->middleware('throttle:60,1')->group(function () {

    // Public endpoints
    Route::get('/jobpostings', [JobPostingApiController::class, 'index']);
    Route::get('/jobpostings/{id}', [JobPostingApiController::class, 'show']);

    // Protected endpoints (token required)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/jobpostings', [JobPostingApiController::class, 'store']);
        Route::put('/jobpostings/{id}', [JobPostingApiController::class, 'update']);
        Route::delete('/jobpostings/{id}', [JobPostingApiController::class, 'destroy']);
    });
});
