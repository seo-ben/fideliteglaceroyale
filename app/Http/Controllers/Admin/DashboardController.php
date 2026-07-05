<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\LoyaltyCard;
use App\Models\PointTransaction;
use App\Models\Level;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke()
    {
        // 1. Core KPIs
        $totalClients = Client::count();
        $totalPoints = Client::sum('total_points');
        $totalCards = LoyaltyCard::count();
        $assignedCards = LoyaltyCard::whereNotNull('client_id')->count();
        
        // 2. Recent Transactions (last 6)
        $recentTransactions = PointTransaction::with('client')
            ->latest()
            ->limit(6)
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'client_name' => $transaction->client->name ?? 'Client supprimé',
                    'client_id' => $transaction->client_id,
                    'points' => $transaction->points,
                    'type' => $transaction->type,
                    'note' => $transaction->note ?? 'N/A',
                    'order_id' => $transaction->order_id,
                    'created_by' => $transaction->created_by ?? 'Système',
                    'created_at' => $transaction->created_at->format('d/m/Y H:i'),
                ];
            });

        // 3. Level breakdown (Client counts by level)
        $levelBreakdown = Level::withCount('clients')
            ->orderBy('points_required', 'asc')
            ->get()
            ->map(function ($level) {
                return [
                    'name' => $level->name,
                    'points_required' => $level->points_required,
                    'clients_count' => $level->clients_count,
                ];
            });

        // 4. Client Points distribution stats (low, medium, high earners)
        $recentClients = Client::with('loyaltyCard', 'currentLevel')
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($client) {
                return [
                    'id' => $client->id,
                    'name' => $client->name,
                    'email' => $client->email ?? 'N/A',
                    'phone' => $client->phone ?? 'N/A',
                    'total_points' => $client->total_points,
                    'level' => $client->currentLevel->name ?? 'Bronze',
                    'card_number' => $client->loyaltyCard->card_number ?? 'Non assignée',
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_clients' => $totalClients,
                'total_points' => $totalPoints,
                'total_cards' => $totalCards,
                'assigned_cards' => $assignedCards,
                'unassigned_cards' => max(0, $totalCards - $assignedCards),
            ],
            'recent_transactions' => $recentTransactions,
            'level_breakdown' => $levelBreakdown,
            'recent_clients' => $recentClients,
        ]);
    }
}
