<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revisions extends Model
{
    use HasFactory;
    protected $table = 'revisions';
    protected $fillable = [
        'session_id',
        'date',
        'jizie_from',
        'jizie_to',
        'surah_from',
        'surah_to',
        'ayyah_from',
        'ayyah_to',
        'page_from',
        'page_to',
        'grade',
        'notes',
        'type',
        'absence_type',
        'riwayahname'
    ];
}
