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
        Schema::create('ring_revisions', function (Blueprint $table) {
            $table->id();
            $table->integer('ring_id');
            $table->index(['ring_id']);
            $table->integer('student_id');
            $table->index(['student_id']);
            $table->date('date')->format('Y-m-d');
            $table->string('from_surrah')->nullable();
            $table->string('to_surrah')->nullable();
            $table->string('from_ayyah')->nullable();
            $table->string('to_ayyah')->nullable();
            $table->boolean('attendance')->default(0);
            $table->enum('type',['revision','recite'])->nullable();
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
        Schema::dropIfExists('ring_revisions');
    }
};
