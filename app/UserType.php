<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserType extends Model
{
    public $table = 'user_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
    ];

    public function user()
    {
        return $this->hasMany('App\User');
    }
}
