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
        Schema::create('point_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // e.g., 'spend', 'welcome_bonus', 'happy_hour', 'visit_bonus', 'custom'
            $table->decimal('value', 10, 2); // Can be flat points (100) or money ratio (500 for 1pt)
            $table->boolean('is_active')->default(true);
            $table->json('conditions')->nullable(); // Extra settings like {start_time: '14:00', end_time: '16:00'}
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_rules');
    }
};
