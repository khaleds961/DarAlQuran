<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RingRevision extends Model
{
    use HasFactory;
    protected $table = 'ring_revisions';
    protected $fillable = [
        'ring_id',
        'student_id',
        'date',
        'from_surrah',
        'to_surrah',
        'from_ayyah',
        'to_ayyah',
        'attendance',
        'type'
    ];
}
