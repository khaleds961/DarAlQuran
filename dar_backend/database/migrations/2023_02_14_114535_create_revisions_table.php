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
        Schema::create('revisions', function (Blueprint $table) {
            $table->id();
            $table->integer('session_id');
            $table->index(['session_id', 'created_at']);
            $table->date('date')->format('Y.m.d');
            $table->string('jizie_from');
            $table->string('jizie_to');
            $table->string('surah_from');
            $table->string('surah_to');
            $table->string('page_from');
            $table->string('page_to');
            $table->string('grade');
            $table->string('notes');
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
        Schema::dropIfExists('revisions');
    }
};
