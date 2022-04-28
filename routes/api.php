<?php

use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;


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
Route::get('get_data_product','App\Http\Controllers\ProductController@getDataProduct');
Route::get('get_data_cart','App\Http\Controllers\CartController@getDataCart');

Route::post('/item', [
    ItemController::class, 'tambahItem'
]);

Route::get('/item', [
    ItemController::class, 'getAll'
]);

Route::post('/item', [
    CartController::class, 'addToCart'
]);
