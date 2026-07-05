<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reward extends Model
{
    protected $fillable = ['level_id', 'name', 'description', 'image_url', 'is_active'];

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }
}
