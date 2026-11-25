<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PointRule;
use App\Models\Level;
use App\Models\Reward;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Désactiver les contraintes de clés étrangères pour pouvoir vider les tables
        Schema::disableForeignKeyConstraints();

        // Vider SEULEMENT les tables de règles et récompenses
        Reward::truncate();
        Level::truncate();
        PointRule::truncate();

        // Réactiver les contraintes
        Schema::enableForeignKeyConstraints();

        // Créer ou mettre à jour l'administrateur
        User::updateOrCreate(
            ['email' => 'admin@smartflow.com'],
            [
                'name' => 'Administrateur',
                'password' => bcrypt('password123'),
                'is_admin' => true,
            ]
        );

        $this->call([
            PointRuleSeeder::class,
            DemoFideliteSeeder::class,
        ]);
    }
}