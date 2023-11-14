<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('keyword');
            $table->unsignedBigInteger('frequency');
            $table->unsignedInteger('position_before');
            $table->unsignedInteger('target_position');
            $table->float('ratio')->default(0.1);
            $table->boolean('active')->default(false);
            $table->unsignedBigInteger('project_id')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
