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
        Schema::table('origins', function (Blueprint $table) {
            $table->string('api_endpoint')->nullable();
            $table->string('api_username')->nullable();
            $table->string('api_password')->nullable();
            $table->string('api_key')->nullable();
        });
    }

    public function down()
    {
        Schema::table('origins', function (Blueprint $table) {
            $table->dropColumn([
                'api_endpoint',
                'api_username',
                'api_password',
                'api_key',
            ]);
        });
    }

};
