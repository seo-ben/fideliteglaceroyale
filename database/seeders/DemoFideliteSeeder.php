<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Level;
use App\Models\LoyaltyCard;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DemoFideliteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create a Level
        $bronze = Level::firstOrCreate([
            'name' => 'Bronze',
        ], [
            'points_required' => 0,
            'reward_description' => 'Niveau de base',
        ]);

        $silver = Level::firstOrCreate([
            'name' => 'Silver',
        ], [
            'points_required' => 50,
            'reward_description' => '1 boisson offerte au choix',
        ]);

        $gold = Level::firstOrCreate([
            'name' => 'Gold',
        ], [
            'points_required' => 200,
            'reward_description' => '10% de réduction sur toutes les commandes',
        ]);

        // 2. Create a Client
        $client = Client::firstOrCreate([
            'email' => 'client@test.com',
        ], [
            'name' => 'Jean ',
            'phone' => '00000000',
            'total_points' => 35,
            'current_level_id' => $bronze->id,
        ]);

        // 3. Create a Card
        $card = LoyaltyCard::firstOrCreate([
            'client_id' => $client->id,
        ], [
            'card_number' => 'LF-12345',
            'qr_token' => 'TOKEN_TEST_123',
        ]);
        
        // 4. Create Rewards for Levels
        $silver->rewards()->firstOrCreate(['name' => 'Boisson Gratuite'], ['description' => 'Une boisson offerte de votre choix']);
        $gold->rewards()->firstOrCreate(['name' => 'Réduction 10%'], ['description' => '10% sur toute la carte']);
    }
}
