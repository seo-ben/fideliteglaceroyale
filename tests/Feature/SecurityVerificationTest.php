<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Client;
use App\Models\LoyaltyCard;
use App\Models\PointRule;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityVerificationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that non-authenticated users cannot access admin settings.
     */
    public function test_guest_cannot_access_admin_routes(): void
    {
        $response = $this->get(route('admin.settings'));
        $response->assertRedirect('/cardfidel/admin/secure/login');
    }

    /**
     * Test that authenticated non-admin users cannot access admin settings (403 Forbidden).
     */
    public function test_non_admin_user_cannot_access_admin_routes(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($user)->get(route('admin.settings'));
        $response->assertStatus(403);
    }

    /**
     * Test that admin users can access admin settings.
     */
    public function test_admin_user_can_access_admin_routes(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);

        $response = $this->actingAs($user)->get(route('admin.settings'));
        $response->assertStatus(200);
    }

    /**
     * Test that the transaction API routes reject request without Sanctum token.
     */
    public function test_api_routes_require_sanctum_auth(): void
    {
        $response = $this->postJson('/api/loyalty/transactions/add', [
            'client_id' => 1,
            'points' => 10,
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test that the webhook rejects requests without signature.
     */
    public function test_webhook_rejects_missing_signature(): void
    {
        $response = $this->postJson('/api/loyalty/transactions/webhook', [
            'qr_token' => 'test_token',
            'amount' => 5000,
        ]);

        $response->assertStatus(403);
        $response->assertSee('Missing webhook signature.');
    }

    /**
     * Test that the webhook rejects invalid signature.
     */
    public function test_webhook_rejects_invalid_signature(): void
    {
        $payload = [
            'qr_token' => 'test_token',
            'amount' => 5000,
        ];

        $response = $this->withHeaders([
            'X-Webhook-Signature' => 'invalid_signature_hash',
        ])->postJson('/api/loyalty/transactions/webhook', $payload);

        $response->assertStatus(403);
        $response->assertSee('Invalid webhook signature.');
    }

    /**
     * Test that webhook accepts valid signature and processes points transaction.
     */
    public function test_webhook_accepts_valid_signature(): void
    {
        // Setup configuration
        config(['services.pos.webhook_secret' => 'super_secret_pos_key']);

        // Create client and loyalty card
        $client = Client::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '12345678',
            'total_points' => 0,
        ]);

        $card = LoyaltyCard::create([
            'card_number' => '1111122222',
            'qr_token' => 'valid_token_123',
            'client_id' => $client->id,
        ]);

        // Spend rule: 1 point per 1000 spent
        PointRule::create([
            'name' => 'Spend Rule',
            'type' => 'spend',
            'value' => 1000,
            'is_active' => true,
        ]);

        $payload = [
            'qr_token' => 'valid_token_123',
            'amount' => 5000,
            'transaction_reference' => 'REF-999',
        ];

        $body = json_encode($payload);
        $signature = hash_hmac('sha256', $body, 'super_secret_pos_key');

        $response = $this->withHeaders([
            'X-Webhook-Signature' => $signature,
        ])->postJson('/api/loyalty/transactions/webhook', $payload);

        $response->assertStatus(200);
        $response->assertJsonPath('success', true);
        $response->assertJsonPath('data.points_earned', 5);
        $this->assertEquals(5, $client->fresh()->total_points);
    }
}
