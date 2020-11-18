<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assign extends Model
{
    use HasFactory;

    protected $fillable = [
        'hours', 'date', 'desktop_id', 'client_id'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function clients()
    {
        return $this->belongsTo('App\Models\Client', 'client_id', 'id');
    }

    public function desktops()
    {
        return $this->belongsTo('App\Models\Desktop', 'desktop_id', 'id');
    }
}
