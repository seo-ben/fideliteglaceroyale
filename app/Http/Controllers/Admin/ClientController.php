<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\LoyaltyCard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::with('loyaltyCard', 'currentLevel')->latest()->get();
        return Inertia::render('Admin/Clients/Index', [
            'clients' => $clients
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Clients/Create');
    }

    public function store(Request $request)
    {
        // Nettoyer le numéro de carte (enlever les espaces) avant la validation
        if ($request->has('card_number') && !empty($request->card_number)) {
            $request->merge([
                'card_number' => preg_replace('/\s+/', '', $request->card_number)
            ]);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'card_number' => 'nullable|string|exists:loyalty_cards,card_number',
        ]);

        if (!empty($validated['card_number'])) {
            $card = LoyaltyCard::where('card_number', $validated['card_number'])->first();
            if ($card && $card->client_id !== null) {
                return back()->withErrors(['card_number' => 'Cette carte est déjà assignée à un autre client.'])->withInput();
            }
        }

        $client = Client::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'total_points' => 0,
        ]);

        if (!empty($validated['card_number']) && isset($card)) {
            $card->update(['client_id' => $client->id]);
        }

        return redirect()->route('admin.clients.index')->with('success', 'Client créé avec succès !');
    }

    public function show(Client $client)
    {
        $client->load('loyaltyCard', 'currentLevel');
        $transactions = \App\Models\PointTransaction::where('client_id', $client->id)->latest()->get();

        return Inertia::render('Admin/Clients/Show', [
            'client' => $client,
            'transactions' => $transactions
        ]);
    }

    public function edit(Client $client)
    {
        $client->load('loyaltyCard');
        return Inertia::render('Admin/Clients/Edit', [
            'client' => $client
        ]);
    }

    public function update(Request $request, Client $client)
    {
        // Nettoyer le numéro de carte (enlever les espaces) avant la validation
        if ($request->has('card_number') && !empty($request->card_number)) {
            $request->merge([
                'card_number' => preg_replace('/\s+/', '', $request->card_number)
            ]);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'card_number' => 'nullable|string|exists:loyalty_cards,card_number',
        ]);

        if (!empty($validated['card_number'])) {
            $card = LoyaltyCard::where('card_number', $validated['card_number'])->first();
            if ($card && $card->client_id !== null && $card->client_id !== $client->id) {
                return back()->withErrors(['card_number' => 'Cette carte est déjà assignée à un autre client.'])->withInput();
            }
        }

        $client->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
        ]);

        if (!empty($validated['card_number']) && isset($card)) {
            // Unassign previous card if there is one
            $previousCard = LoyaltyCard::where('client_id', $client->id)->first();
            if ($previousCard && $previousCard->id !== $card->id) {
                $previousCard->update(['client_id' => null]);
            }
            $card->update(['client_id' => $client->id]);
        }

        return redirect()->route('admin.clients.index')->with('success', 'Client mis à jour avec succès !');
    }
}
