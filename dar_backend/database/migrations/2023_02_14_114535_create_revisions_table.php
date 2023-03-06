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
            $table->string('jizie_from')->nullable();
            $table->string('jizie_to')->nullable();
            $table->string('surah_from');
            $table->string('surah_to');
            $table->string('ayyah_from')->nullable();
            $table->string('ayyah_to')->nullable();
            $table->string('page_from')->nullable();
            $table->string('page_to')->nullable();
            $table->string('grade')->nullable();
            $table->string('notes')->nullable();
            $table->string('riwayahname')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->enum('type', ['recite', 'revision','absence']);
            $table->enum('absence_type', ['excused', 'unexcused','teacher_excused'])->nullable();
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
