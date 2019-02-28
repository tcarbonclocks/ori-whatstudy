<?php

namespace App\Http\Controllers;

use App\Room;
use App\Token;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function showAll($token)
    {

        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        $rooms = Room::all();
        foreach ($rooms as $room) {
            $room->messages;
        }
        return response()->json($rooms);
    }

    public function showOne($token, Room $room)
    {      
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        return response()->json($room);
    }

    public function showRoomMessages($token, Room $room, Request $request)
    {      
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        $page = $request->page;
        $messages = $room->messages->sortByDesc('created_at')->forPage($page, 20)->reverse()->values();
        $messages->load('user');
        return response()->json($messages);
    }

}