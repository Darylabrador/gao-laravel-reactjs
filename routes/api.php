<?php

use App\Http\Controllers\GeneralController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AssignController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DesktopController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// post login route
Route::post('/login', [AuthController::class, 'postLogin']);

// protected routes
Route::middleware('auth:api')->group(function() {
    Route::get('/computers', [DesktopController::class, 'getAll']);
    Route::post('/computers', [DesktopController::class, 'createDesktop']);
    Route::post('/client/search', [ClientController::class, 'searchClient']);
    Route::post('/client/attributions', [ClientController::class, 'createClient']);
    Route::post('/computers/attributions', [AssignController::class, 'setAttribution']);
    Route::delete('/computers/attributions/{id}', [AssignController::class, 'deleteAttribution']);
    Route::delete('/computers/{id}', [DesktopController::class, 'deleteDesktop']);
});