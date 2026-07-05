<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PointTransaction extends Model
{
    protected $fillable = ['client_id', 'order_id', 'points', 'type', 'note', 'created_by'];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
