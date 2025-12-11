<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('meetings', function (Blueprint $table) {
            $table->longText('start_url')->change();
            $table->longText('join_url')->change();
        });
    }

    public function down()
    {
        Schema::table('meetings', function (Blueprint $table) {
            $table->string('start_url')->change();
            $table->string('join_url')->change();
        });
    }

};
