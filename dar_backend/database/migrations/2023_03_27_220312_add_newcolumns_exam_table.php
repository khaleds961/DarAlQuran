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
        Schema::table('exams', function (Blueprint $table) {
            $table->boolean('has_receive_ijaza')->nullable();
            $table->date('recieve_ijaza_date')->format('Y-m-d')->nullable();
            $table->string('ijaza_copy_file')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('exams', function (Blueprint $table) {
            $table->dropColumn('has_receive_ijaza');
            $table->dropColumn('recieve_ijaza_date');
            $table->dropColumn('ijaza_copy_file');
        });
    }
};
