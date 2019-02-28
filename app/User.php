<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'name', 'user_type_id'
    ];

    public function message()
    {
        return $this->hasMany('App\Message');
    }
}
