<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quran_sessions', function (Blueprint $table) {
            $table->id();
            $table->integer('center_student_teacher_id');
            $table->string('weekday');
            $table->string('session_time');
            $table->index(['center_student_teacher_id', 'created_at']);
            $table->boolean('is_deleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quran_sessions');
    }
};
