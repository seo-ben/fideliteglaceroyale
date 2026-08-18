<?php

namespace Database\Seeders;

use App\Models\Level;
use App\Models\Reward;
use Illuminate\Database\Seeder;

class DemoFideliteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Créer ou mettre à jour les niveaux de fidélité avec leurs récompenses
        $levels = [
            [
                'name' => 'Découverte',
                'points_required' => 0,
                'rewards' => []
            ],
            [
                'name' => 'Glace',
                'points_required' => 40,
                'rewards' => [
                    ['name' => '1 Boule de Glace', 'description' => '1 boule de glace offerte au choix']
                ]
            ],
            [
                'name' => 'Gourmand',
                'points_required' => 80,
                'rewards' => [
                    ['name' => '2 Boules ou Pâtisserie', 'description' => '2 boules de glace OU une pâtisserie individuelle']
                ]
            ],
            [
                'name' => 'Premium',
                'points_required' => 120,
                'rewards' => [
                    ['name' => 'Coupe Glacée ou Dessert Premium', 'description' => 'Une coupe glacée OU un dessert premium']
                ]
            ],
            [
                'name' => 'Gourmet',
                'points_required' => 180,
                'rewards' => [
                    ['name' => 'Pizza Classique', 'description' => 'Une pizza classique offerte']
                ]
            ],
            [
                'name' => 'V.I.P.',
                'points_required' => 250,
                'rewards' => [
                    ['name' => 'Bon d\'achat ou Gâteau', 'description' => 'Un bon d\'achat de 15 000 FCFA OU un gâteau d\'anniversaire (selon la marge)']
                ]
            ]
        ];

        foreach ($levels as $levelData) {
            // Créer ou mettre à jour le niveau
            $level = Level::updateOrCreate(
                ['name' => $levelData['name']],
                [
                    'points_required' => $levelData['points_required'],
                    'reward_description' => count($levelData['rewards']) > 0 
                        ? $levelData['rewards'][0]['description'] 
                        : 'Niveau de départ'
                ]
            );

            // Créer ou mettre à jour les récompenses associées
            foreach ($levelData['rewards'] as $rewardData) {
                Reward::updateOrCreate(
                    ['level_id' => $level->id, 'name' => $rewardData['name']],
                    [
                        'description' => $rewardData['description'],
                        'is_active' => true
                    ]
                );
            }
        }
    }
}