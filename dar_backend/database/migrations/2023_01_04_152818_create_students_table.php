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
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->string('mother_name');
            $table->string('address');
            $table->string('place_of_birth');
            $table->date('birthdate')->format('Y.m.d');
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed'])->nullable();
            $table->enum('reading_level', ['tilawa', 'hifz', 'kiraat']);
            $table->enum('kiraat_type',['kobra','soghra','ifrad'])->nullable();
            $table->string('file_name')->nullable();
            $table->string('path')->nullable();
            $table->string('school_uni_name')->nullable();
            $table->string('major')->nullable();
            $table->string('rate')->nullable();
            $table->string('blood_type');
            $table->boolean('is_ring')->default(0);
            $table->enum('gender', ['male', 'female']);
            $table->string('nationality');
            $table->string('current_job')->nullable();
            $table->string('mother_work')->nullable();
            $table->string('father_work')->nullable();
            $table->integer('phone_number')->nullable();
            $table->integer('work_number')->nullable();
            $table->integer('home_number')->nullable();
            $table->enum('student_level_status', ['beginner', 'reader', 'hafez', 'moujaz']);
            $table->string('suitable_days')->nullable();
            $table->string('suitable_times')->nullable();
            $table->string('sheikh_names')->nullable();
            $table->string('memorizing')->nullable();
            $table->boolean('female_question')->nullable();
            $table->boolean('has_ijaza')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->string('father_number')->nullable();
            $table->string('mother_number')->nullable();
            $table->string('skills')->nullable();
            $table->string('notes')->nullable();
            $table->integer('ring_id');
            $table->index('ring_id','ring')->nullable();
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
