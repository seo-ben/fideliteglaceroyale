<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PointRule extends Model
{
    protected $fillable = [
        'name',
        'type',
        'value',
        'is_active',
        'conditions',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'conditions' => 'array',
        'value' => 'float',
    ];
}
