<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\LoyaltyCard;
use App\Models\PointRule;
use App\Services\PointTransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;

class PointTransactionController extends Controller
{
    protected PointTransactionService $pointTransactionService;

    public function __construct(PointTransactionService $pointTransactionService)
    {
        $this->pointTransactionService = $pointTransactionService;
    }

    /**
     * Add points to a client.
     * composer install --no-dev --optimize-autoloader
     */
    public function add(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'points' => 'required|integer|min:1',
            'order_id' => 'nullable|integer',
            'note' => 'nullable|string|max:255',
            'created_by' => 'nullable|string|max:255',
        ]);

        try {
            $client = Client::findOrFail($validated['client_id']);
            
            $transaction = $this->pointTransactionService->addPoints(
                $client,
                $validated['points'],
                $validated['order_id'] ?? null,
                $validated['note'] ?? null,
                $validated['created_by'] ?? null
            );

            return response()->json([
                'success' => true,
                'message' => 'Points successfully added.',
                'data' => [
                    'transaction' => $transaction,
                    'new_balance' => $client->fresh()->total_points
                ]
            ], 200);

        } catch (Exception $e) {
            Log::error('Add points error', ['client_id' => $validated['client_id'], 'exception' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'ajout des points.'
            ], 400);
        }
    }

    /**
     * Redeem points from a client.
     */
    public function redeem(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'points' => 'required|integer|min:1',
            'order_id' => 'nullable|integer',
            'note' => 'nullable|string|max:255',
            'created_by' => 'nullable|string|max:255',
        ]);

        try {
            $client = Client::findOrFail($validated['client_id']);
            
            $transaction = $this->pointTransactionService->redeemPoints(
                $client,
                $validated['points'],
                $validated['order_id'] ?? null,
                $validated['note'] ?? null,
                $validated['created_by'] ?? null
            );

            return response()->json([
                'success' => true,
                'message' => 'Points successfully redeemed.',
                'data' => [
                    'transaction' => $transaction,
                    'new_balance' => $client->fresh()->total_points
                ]
            ], 200);

        } catch (Exception $e) {
            Log::error('Redeem points error', ['client_id' => $validated['client_id'], 'exception' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors du rachat des points.'
            ], 400);
        }
    }

    /**
     * Webhook called by POS System when an order is paid.
     */
    public function webhook(Request $request)
    {
        $validated = $request->validate([
            'qr_token' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'transaction_reference' => 'nullable|string',
        ]);

        try {
            // Find Loyalty Card by QR Token or Card Number
            $card = LoyaltyCard::where('qr_token', $validated['qr_token'])
                ->orWhere('card_number', $validated['qr_token'])
                ->first();

            if (!$card) {
                return response()->json([
                    'success' => false,
                    'message' => 'Carte de fidélité introuvable.'
                ], 404);
            }

            $client = $card->client;

            if (!$client) {
                return response()->json([
                    'success' => false,
                    'message' => 'Client associé introuvable.'
                ], 404);
            }

            // Calculate points: Look for a 'spend' rule
            $spendRule = PointRule::where('type', 'spend')->where('is_active', true)->first();
            
            $points = 0;
            if ($spendRule && $spendRule->value > 0) {
                // e.g. value = 1000 (1 point per 1000 FCFA)
                $points = floor($validated['amount'] / $spendRule->value);
            } else {
                // Default: 1000 FCFA = 1 point as per specs
                $points = floor($validated['amount'] / 1000);
            }

            if ($points <= 0) {
                return response()->json([
                    'success' => true,
                    'message' => 'Le montant est insuffisant pour gagner des points.',
                    'data' => [
                        'points_earned' => 0,
                    ]
                ], 200);
            }

            // Add points
            $transaction = $this->pointTransactionService->addPoints(
                $client,
                $points,
                null,
                "Achat: " . ($validated['transaction_reference'] ?? 'N/A'),
                'webhook'
            );

            return response()->json([
                'success' => true,
                'message' => 'Points successfully added via webhook.',
                'data' => [
                    'points_earned' => $points,
                    'new_balance' => $client->fresh()->total_points,
                    'transaction' => $transaction
                ]
            ], 200);

        } catch (Exception $e) {
            Log::error('Loyalty Webhook Error', ['exception' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json([
                'success' => false,
                'message' => 'Une erreur interne est survenue.'
            ], 500);
        }
    }
}
