<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function () use ($router) {

    $router->get('rooms/check/{token}',  ['uses' => 'RoomController@showAllRooms']);
  
    $router->get('rooms/{id}/check/{token}', ['uses' => 'RoomController@showOneRoom']);
  
    $router->post('rooms/check/{token}', ['uses' => 'RoomController@create']);
  
    $router->delete('rooms/{id}/check/{token}', ['uses' => 'RoomController@delete']);
  
    $router->put('rooms/{id}/check/{token}', ['uses' => 'RoomController@update']);
});

