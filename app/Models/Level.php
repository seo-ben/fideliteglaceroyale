<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    protected $fillable = ['name', 'points_required', 'reward_description', 'reward_image'];

    public function rewards(): HasMany
    {
        return $this->hasMany(Reward::class);
    }

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class, 'current_level_id');
    }
}
