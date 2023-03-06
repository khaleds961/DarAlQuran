<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Students_Centers_Teachers extends Model
{
    use HasFactory;
    protected $table = 'students_centers_teachers';
    protected $fillable = [
        'center_id',
        'student_id',
        'user_id'
    ];

}
