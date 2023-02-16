<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rings extends Model
{
    use HasFactory;
    protected $table = 'rings';
    protected $fillable = [
        'teacher_id',
        'center_id',
        'name',
        'is_activated'
    ];
}
