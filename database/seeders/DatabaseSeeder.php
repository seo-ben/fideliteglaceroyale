<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Administrateur',
            'email' => 'smartflowpos@gmail.com',
            'password' => bcrypt('Smartflow@7026!!'),
            'is_admin' => true,
        ]);

        $this->call([
            PointRuleSeeder::class,
            DemoFideliteSeeder::class,
        ]);
    }

}
