<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    
    protected $table = 'items';

    protected $fillable = [
        'name',
        'desc',
        'stock',
        'price'
    ];
}
