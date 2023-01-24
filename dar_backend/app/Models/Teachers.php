<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teachers extends Model
{
    use HasFactory;
    protected $table = 'teachers';
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'phone_number',
        'user_id',
        'is_deleted'
    ];   
}
