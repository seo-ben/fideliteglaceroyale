<?php

namespace Database\Seeders;

use App\Models\PointRule;
use Illuminate\Database\Seeder;

class PointRuleSeeder extends Seeder
{
    public function run(): void
    {
        // Règle principale : 1 point = 1000 FCFA
        PointRule::updateOrCreate(
            ['type' => 'spend'],
            [
                'name' => 'Dépense classique (1 point = 1000 FCFA dépensés',
                'type' => 'spend',
                'value' => 1000,
                'is_active' => true,
            ]
        );

        PointRule::updateOrCreate(
            ['type' => 'welcome_bonus'],
            [
                'name' => 'Bonus de Bienvenue (Points offerts à l\'inscription)',
                'type' => 'welcome_bonus',
                'value' => 0,
                'is_active' => false,
            ]
        );

        PointRule::updateOrCreate(
            ['type' => 'happy_hour'],
            [
                'name' => 'Multiplicateur Happy Hour (x)',
                'type' => 'happy_hour',
                'value' => 2,
                'is_active' => false,
                'conditions' => ['start_time' => '14:00', 'end_time' => '17:00']
            ]
        );

        PointRule::updateOrCreate(
            ['type' => 'visit_bonus'],
            [
                'name' => 'Bonus par Visite (Points fixes par commande)',
                'type' => 'visit_bonus',
                'value' => 0,
                'is_active' => false,
            ]
        );
    }
}