<?php

namespace App\Http\Controllers;

use App\Message;
use App\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function showAll($token)
    {
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        $messages = Message::all();
        foreach ($messages as $message) {
            $message->user;
            $message->room;
        }
        return response()->json($messages);
    }

    public function showOne($token, Message $message)
    {
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }
        
        $message->user;
        $message->room;
        return response()->json($message);
    }

    public function sendMessage($token, Request $request)
    {
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        $rules = [
            'user_id'=> 'required|max:11',
            'room_id'=> 'required|max:10',
            'description'=> 'required',
        ];
        $this->validate($request, $rules);

        $message = Message::create($request->all());

        return response()->json($message, 201);
    }

    public function getStatistics($token) {
        if (!Token::check($token)) {
            return response()->json('Unauthorized token', 401);
        }

        $messages = DB::table('messages')->select(DB::raw('left(created_at,10) as create_date, count(*) as number') )->groupBy('create_date')->orderByDesc('create_date')->limit(7)->get();
        return response()->json($messages);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
