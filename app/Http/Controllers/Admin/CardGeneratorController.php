<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LoyaltyCard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CardGeneratorController extends Controller
{
    /**
     * Show the generator form.
     */
    public function index()
    {
        return Inertia::render('Admin/Cards/Generator');
    }

    /**
     * Generate the requested number of cards.
     */
    public function generate(Request $request)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:500',
        ]);

        $quantity = $request->input('quantity');
        $generatedCards = [];

        for ($i = 0; $i < $quantity; $i++) {
            // Generate a unique 10-digit card number
            do {
                $cardNumber = str_pad(random_int(0, 99999), 5, '0', STR_PAD_LEFT) . str_pad(random_int(0, 99999), 5, '0', STR_PAD_LEFT);
            } while (LoyaltyCard::where('card_number', $cardNumber)->exists());

            // Generate a unique QR token
            do {
                $qrToken = Str::random(32);
            } while (LoyaltyCard::where('qr_token', $qrToken)->exists());

            $card = LoyaltyCard::create([
                'card_number' => $cardNumber,
                'qr_token'    => $qrToken,
                'client_id'   => null, // Pre-printed card, unassigned
            ]);

            $generatedCards[] = $card->id;
        }

        // Redirect to the print view, passing the IDs of the newly generated cards
        // To avoid URL length limits, we can store the IDs in session
        session()->put('print_batch_ids', $generatedCards);

        return redirect()->route('admin.cards.print');
    }

    /**
     * Show the print view.
     */
    public function printView()
    {
        $cardIds = session()->get('print_batch_ids', []);
        
        if (empty($cardIds)) {
            return redirect()->route('admin.cards.generator')->with('error', 'Aucune carte à imprimer.');
        }

        $cards = LoyaltyCard::whereIn('id', $cardIds)->get();

        return Inertia::render('Admin/Cards/PrintBatch', [
            'cards' => $cards
        ]);
    }
}
