<?php

use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\AuthController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/item', [
    ItemController::class, 'tambahItem'
]);

Route::get('/item', [
    ItemController::class, 'getAll'
]);

Route::get('/cart', [
    CartController::class, 'getAll'
]);

Route::post('/item', [
    CartController::class, 'addToCart'
]);

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('/login', [
        AuthController::class, 'login'
    ]);

    Route::post('/logout', [
        AuthController::class, 'logout'
    ]);

    Route::post('/refresh', [
        AuthController::class, 'refresh'
    ]);

    Route::post('/me', [
        AuthController::class, 'me'
    ]);


});
