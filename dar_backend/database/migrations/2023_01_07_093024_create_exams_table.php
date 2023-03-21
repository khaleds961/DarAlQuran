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
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->integer('teacher_id_1');
            $table->integer('teacher_id_2');
            $table->integer('teacher_id_3');
            $table->integer('teacher_student');
            $table->integer('center_student_teacher_id');
            $table->index('teacher_id_1', 'teacher_id_1');
            $table->index('teacher_id_2', 'teacher_id_2');
            $table->index('teacher_id_3', 'teacher_id_3');
            $table->index(['teacher_student']);
            $table->integer('student_id');
            $table->index(['student_id']);
            $table->integer('center_id');
            $table->index(['center_id']);
            $table->index(['center_student_teacher_id'])->nullable();
            $table->string('b')->nullable();
            $table->string('tarik')->nullable();
            $table->string('grade')->nullable();
            $table->string('jizie_from');
            $table->string('jizie_to');
            $table->enum('decision', ['yes', 'no']);
            $table->text('note')->nullable();
            $table->date('date')->format('Y-m-d');
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
        Schema::dropIfExists('exams');
    }
};
