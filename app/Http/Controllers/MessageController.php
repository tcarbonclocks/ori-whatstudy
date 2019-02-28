<?php

namespace App\Http\Controllers;

use App\Message;
use App\Token;
use Illuminate\Http\Request;

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
