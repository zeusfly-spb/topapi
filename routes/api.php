<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectGroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix('auth')->group(function () {
  Route::post('register', [UserController::class, 'register']);
  Route::post('login', [UserController::class, 'login']);
});

Route::middleware('auth:api')->group( function () {
  Route::apiResource('project-groups', ProjectGroupController::class);
  Route::apiResource('projects', ProjectController::class);
  Route::get('details', [UserController::class, 'details']);
});
