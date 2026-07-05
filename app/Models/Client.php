<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $fillable = ['name', 'phone', 'email', 'total_points', 'current_level_id'];

    public function currentLevel(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'current_level_id');
    }

    public function loyaltyCard(): HasOne
    {
        return $this->hasOne(LoyaltyCard::class);
    }

    public function pointTransactions(): HasMany
    {
        return $this->hasMany(PointTransaction::class);
    }
}
