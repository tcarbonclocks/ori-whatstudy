<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('rooms/check/{token}', 'RoomController@showAll');
Route::get('users/check/{token}', 'UserController@showAll');
Route::get('messages/check/{token}', 'MessageController@showAll');
Route::get('rooms/check/{token}/{room}', 'RoomController@showOne');
Route::get('messages/check/{token}/{message}', 'MessageController@showOne');
Route::get('users/check/{token}/{user}', 'UserController@showOne');
Route::get('rooms/checkMessages/{token}/{room}', 'RoomController@showRoomMessages');

Route::post('messages/send/{token}', 'MessageController@sendMessage');