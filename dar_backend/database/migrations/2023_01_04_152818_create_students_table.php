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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->string('mother_name');
            $table->string('place_of_birth');
            $table->date('birthdate')->format('Y.m.d');
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed']);
            $table->enum('reading_level', ['tilawa', 'hifz', 'kiraat']);
            $table->string('school_uni_name');
            $table->string('major');
            $table->string('blood_type');
            $table->boolean('is_ring');
            $table->enum('gender', ['male', 'female']);
            $table->string('nationality');
            $table->string('current_job');
            $table->integer('phone_number');
            $table->integer('work_number');
            $table->integer('home_number');
            $table->enum('student_level_status', ['beginner', 'reader', 'hafez', 'moujaz']);
            $table->string('suitable_days');
            $table->string('suitable_times');
            $table->string('sheikh_names');
            $table->string('memorizing');
            $table->boolean('female_question');
            $table->boolean('has_ijaza');
            $table->boolean('is_deleted')->default(0);
            $table->string('father_number');
            $table->string('mother_number');
            $table->string('skills');
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
        Schema::dropIfExists('students');
    }
};
