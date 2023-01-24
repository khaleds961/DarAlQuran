<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    use HasFactory;
    protected $table = 'students';
    protected $fillable = [
        'user_id',
        'first_name',
        'middle_name',
        'last_name',
        'mother_name',
        'place_of_birth',
        'birthdate',
        'marital_status',
        'reading_level',
        'school_uni_name',
        'major',
        'blood_type',
        'is_ring',
        'gender',
        'nationality',
        'current_job',
        'phone_number',
        'work_number',
        'home_number',
        'student_level_status',
        'suitable_days',
        'suitable_times',
        'sheikh_names',
        'memorizing',
        'female_question',
        'has_ijaza'
    ];
}
