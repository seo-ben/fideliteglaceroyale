<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoyaltyCard extends Model
{
    protected $fillable = ['card_number', 'qr_token', 'client_id'];

    public function client(): ?BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
