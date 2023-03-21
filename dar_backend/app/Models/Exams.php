<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exams extends Model
{
    use HasFactory;
    protected $table = 'exams';
    protected $fillable = [
        'teacher_id_1',
        'teacher_id_2',
        'teacher_id_3',
        'teacher_student',
        'student_id',
        'center_id',
        'center_student_teacher_id',
        'b',
        'tarik',
        'grade',
        'jizie_from',
        'jizie_to',
        'decision',
        'note',
        'date'
    ];
}
