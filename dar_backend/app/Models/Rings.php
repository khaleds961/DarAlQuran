<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Rings extends Model
{
    use HasFactory;
    protected $table = 'rings';
    protected $fillable = [
        'teacher_id',
        'center_id',
        'name',
        'is_activated'
    ];

    public function teacher(){
        return $this->belongsTo(Users::class,'teacher_id');
    }

    public function students(){
        return $this->hasMany(Students::class,'ring_id','id');
    }
}
