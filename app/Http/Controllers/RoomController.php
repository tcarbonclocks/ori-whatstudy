<?php

namespace App\Http\Controllers;

use App\Room;
use App\Token;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function showAllRooms($token)
    {

        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        return response()->json(Room::all());
    }

    public function showOneRoom($id, $token)
    {
        return response()->json(Room::find($id));
    }

    public function create(Request $request, $token)
    {      
        $room = Room::create($request->all());
        return response()->json($room, 201);
    }

    public function update($id, Request $request, $token)
    {       
        $room = Room::findOrFail($id);
        $room->update($request->all());
        return response()->json($room, 200);
    }

    public function delete($id, $token)
    {        
        Room::findOrFail($id)->delete();
        return response()->json('Deleted Successfully', 200);
    }
}