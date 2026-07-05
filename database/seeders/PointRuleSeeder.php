<?php

namespace Database\Seeders;

use App\Models\PointRule;
use Illuminate\Database\Seeder;

class PointRuleSeeder extends Seeder
{
    public function run(): void
    {
        PointRule::create([
            'name' => 'Dépense classique (Montant en FCFA pour 1 point)',
            'type' => 'spend',
            'value' => 500,
            'is_active' => true,
        ]);

        PointRule::create([
            'name' => 'Bonus de Bienvenue (Points offerts à l\'inscription)',
            'type' => 'welcome_bonus',
            'value' => 100,
            'is_active' => true,
        ]);

        PointRule::create([
            'name' => 'Multiplicateur Happy Hour (x)',
            'type' => 'happy_hour',
            'value' => 2,
            'is_active' => false,
            'conditions' => ['start_time' => '14:00', 'end_time' => '17:00']
        ]);

        PointRule::create([
            'name' => 'Bonus par Visite (Points fixes par commande)',
            'type' => 'visit_bonus',
            'value' => 10,
            'is_active' => false,
        ]);
    }
}
