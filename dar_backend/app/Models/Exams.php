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
        'date',
        'has_receive_ijaza',
        'recieve_ijaza_date',
        'ijaza_copy_file',
        'ijaza_in'
    ];

    public function students(){
        return $this->hasMany(Students::class,'id','student_id');
    }
}
