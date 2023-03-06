<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sessions extends Model
{
    use HasFactory;
    protected $table = 'quran_sessions';
    protected $fillable = [
        'center_student_teacher_id',
        'weekday',
        'weekday_id',
        'session_time',
        'is_deleted'
    ];

    public function student()
    {
        return $this->hasOneThrough(
            Students::class,
            Sessions::class,
            'id',
            'id'
        );
    }
}
