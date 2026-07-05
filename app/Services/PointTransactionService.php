<?php

namespace App\Services;

use App\Models\Client;
use App\Models\PointTransaction;
use Illuminate\Support\Facades\DB;
use Exception;

class PointTransactionService
{
    /**
     * Add points to a client's account.
     *
     * @param Client $client
     * @param int $points
     * @param int|null $orderId
     * @param string|null $note
     * @param string|null $createdBy
     * @return PointTransaction
     * @throws Exception
     */
    public function addPoints(Client $client, int $points, ?int $orderId = null, ?string $note = null, ?string $createdBy = null): PointTransaction
    {
        if ($points <= 0) {
            throw new Exception("Points to add must be greater than zero.");
        }

        return DB::transaction(function () use ($client, $points, $orderId, $note, $createdBy) {
            // Re-fetch the client with lock to prevent race conditions
            $lockedClient = Client::where('id', $client->id)->lockForUpdate()->first();

            // 1. Create the transaction record
            $transaction = PointTransaction::create([
                'client_id' => $lockedClient->id,
                'order_id' => $orderId,
                'points' => $points,
                'type' => 'credit',
                'note' => $note,
                'created_by' => $createdBy,
            ]);

            // 2. Update client's total points
            $lockedClient->increment('total_points', $points);

            return $transaction;
        });
    }

    /**
     * Redeem points from a client's account.
     *
     * @param Client $client
     * @param int $points
     * @param int|null $orderId
     * @param string|null $note
     * @param string|null $createdBy
     * @return PointTransaction
     * @throws Exception
     */
    public function redeemPoints(Client $client, int $points, ?int $orderId = null, ?string $note = null, ?string $createdBy = null): PointTransaction
    {
        if ($points <= 0) {
            throw new Exception("Points to redeem must be greater than zero.");
        }

        // Lock the client row for update to prevent race conditions during redemption
        return DB::transaction(function () use ($client, $points, $orderId, $note, $createdBy) {
            // Re-fetch the client with lock to ensure accurate point balance
            $lockedClient = Client::where('id', $client->id)->lockForUpdate()->first();

            if ($lockedClient->total_points < $points) {
                throw new Exception("Insufficient points balance.");
            }

            // 1. Create the transaction record
            $transaction = PointTransaction::create([
                'client_id' => $lockedClient->id,
                'order_id' => $orderId,
                'points' => $points,
                'type' => 'debit',
                'note' => $note,
                'created_by' => $createdBy,
            ]);

            // 2. Update client's total points
            $lockedClient->decrement('total_points', $points);

            return $transaction;
        });
    }
}
