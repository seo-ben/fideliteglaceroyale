<?php

namespace App\Http\Controllers;

use App\Models\LoyaltyCard;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicClientController extends Controller
{
    public function login(Request $request)
    {
        // Nettoyer le numéro de carte (enlever les espaces) avant la validation
        if ($request->has('card_number') && !empty($request->card_number)) {
            $request->merge([
                'card_number' => preg_replace('/\s+/', '', $request->card_number)
            ]);
        }

        $request->validate([
            'card_number' => 'required|string',
        ]);

        $card = LoyaltyCard::where('card_number', $request->card_number)->first();

        if (!$card) {
            return back()->withErrors(['card_number' => 'Numéro de carte introuvable.']);
        }

        if (!$card->client_id) {
            return back()->withErrors(['card_number' => 'Cette carte n\'est pas encore assignée à un compte.']);
        }

        return redirect()->route('client.portal', ['qr_token' => $card->qr_token]);
    }

    public function show(string $qrToken)
    {
        $card = LoyaltyCard::with('client.currentLevel')
            ->where('qr_token', $qrToken)
            ->first();

        if (!$card) {
            return redirect('/')->withErrors(['card_number' => 'Ce QR Code ne correspond à aucune carte valide.']);
        }

        $client = $card->client;
        
        if (!$client) {
            return redirect('/')->withErrors(['card_number' => 'Cette carte n\'est pas encore assignée à un client.']);
        }

        // Fetch all levels sorted by required points to calculate next level
        $levels = Level::with('rewards')->orderBy('points_required', 'asc')->get();
        
        $nextLevel = null;
        foreach ($levels as $level) {
            if ($level->points_required > $client->total_points) {
                $nextLevel = $level;
                break;
            }
        }

        // Progression percentage
        $progress = 100;
        if ($nextLevel) {
            $prevLevelPoints = $client->currentLevel ? $client->currentLevel->points_required : 0;
            $range = $nextLevel->points_required - $prevLevelPoints;
            $earned = $client->total_points - $prevLevelPoints;
            $progress = $range > 0 ? min(100, max(0, round(($earned / $range) * 100))) : 100;
        }

        return Inertia::render('Client/Portal', [
            'client' => [
                'name' => $client->name,
                'total_points' => $client->total_points,
                'current_level' => $client->currentLevel ? $client->currentLevel->name : 'Nouveau',
            ],
            'next_level' => $nextLevel ? [
                'name' => $nextLevel->name,
                'points_required' => $nextLevel->points_required,
                'points_missing' => $nextLevel->points_required - $client->total_points,
                'progress' => $progress,
            ] : null,
            'levels' => $levels->map(function ($l) use ($client) {
                return [
                    'id' => $l->id,
                    'name' => $l->name,
                    'points_required' => $l->points_required,
                    'is_unlocked' => $client->total_points >= $l->points_required,
                    'rewards' => $l->rewards->map(fn($r) => [
                        'id' => $r->id,
                        'name' => $r->name,
                        'description' => $r->description,
                        'image_url' => $r->image_url,
                    ])
                ];
            })
        ]);
    }
}
