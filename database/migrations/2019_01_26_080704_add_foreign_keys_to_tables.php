<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeysToTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('user_type_id')->references('id')->on('user_types');
        });

        Schema::table('messages', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('room_id')->references('id')->on('rooms');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_user_type_id_foreign');
        });

        Schema::table('messages', function (Blueprint $table) {
            $table->dropForeign('messages_user_id_foreign');
            $table->dropForeign('messages_room_id_foreign');
        });

    }
}
