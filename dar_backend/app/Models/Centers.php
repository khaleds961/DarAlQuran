<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Centers extends Model
{
    use HasFactory;
    protected $table = 'centers';
    protected $fillable = [
        'name',
        'location',
        'is_deleted'
    ];

    public function teacher()
    {
        return $this->belongsToMany(Teachers::class,'students_centers_teachers','center_id','teacher_id')->get();
     }
}
