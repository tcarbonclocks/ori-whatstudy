<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $keyType = 'string';

    protected $fillable = [
        'name', 'user_type_id'
    ];

    public function messages()
    {
        return $this->hasMany('App\Message');
    }

    public function usertype()
    {
        return $this->belongsTo('App\UserType', 'user_type_id');
    }
}
