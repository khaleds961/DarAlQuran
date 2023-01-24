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
        Schema::create('students_centers_teachers', function (Blueprint $table) {
            $table->id();
            $table->integer('teacher_id')->nullable()->unsigned();
            $table->integer('student_id')->nullable()->unsigned();
            $table->integer('center_id')->nullable()->unsigned();
            $table->index(['teacher_id', 'created_at'])->nullable();
            $table->index(['student_id', 'created_at'])->nullable();
            $table->index(['center_id', 'created_at'])->nullable();
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
        Schema::dropIfExists('students_centers_teachers');
    }
};
