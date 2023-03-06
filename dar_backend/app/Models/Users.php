<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class Users extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'users';
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'phone_number',
        'username',
        'password',
        'role_id'
    ];
    protected $hidden = [
        'password',
    ];


    public function centers()
    {
        return $this->belongsToMany(Centers::class, 'students_centers_teachers', 'user_id', 'center_id')
            ->select('center_id', 'name', 'location');
    }

    public function students()
    {
        return $this->belongsToMany(Students::class, 'students_centers_teachers', 'user_id', 'student_id');
    }

    public function sessions()
    {
        return $this->hasManyThrough(
            Sessions::class,
            Students_Centers_Teachers::class,
            'user_id',
            'center_student_teacher_id',
        );
    }
}
