<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RingComments extends Model
{
    use HasFactory;
    protected $table = 'ring_comments';
    protected $fillable = [
        'ring_id',
        'date',
        'comment'
    ];
}
