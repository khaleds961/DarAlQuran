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
        'ring_id',
        'gender',
        'nationality',
        'current_job',
        'mother_work',
        'father_work',
        'father_number',
        'mother_number',
        'phone_number',
        'work_number',
        'home_number',
        'student_level_status',
        'suitable_days',
        'suitable_times',
        'sheikh_names',
        'memorizing',
        'female_question',
        'has_ijaza',
        'address',
        'rate',
        'skills',
        'notes'
    ];

    public function teachers()
    {
        return $this->belongsToMany(Users::class, 'students_centers_teachers', 'center_id', 'user_id')
            ->where('role_id', 4)
            ->where('users.is_deleted', 0)
            ->distinct();
    }

    public function centers()
    {
        return $this->belongsToMany(Centers::class, 'students_centers_teachers', 'student_id', 'center_id');
    }

    public function sessions()
    {
        return $this->hasMany(Sessions::class);
    }
}
