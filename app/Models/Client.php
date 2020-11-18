<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',  'surname'
    ];

    
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    
    public function assigns()
    {
        return $this->hasMany('App\Models\Assign');
    }

}
