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
}