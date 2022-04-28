<?php

namespace App\Repositories;
use App\Models\Cart;
use App\Models\Item;
use Illuminate\Support\Facades\DB;

class CartRepository 
{
    protected $cart;
    protected $item;


    public function __construct(Cart $cart,Item $item)
    {
        $this->cart = $cart;
        $this->item = $item;
    }


    public function save ($data)
    {
        $cart = new $this->cart;

        $cart->desc = $data['stock_beli'];
        $cart->harga = $data['total_harga'];
        $cart->save();

        return $cart->fresh();
        
    }

    public function getStok(string $name): ?int
    {
        $query = DB::collection($name)
        ->where('nama_barang', $name)
        ->value('stock');
        return $query;
    }
    
    public function addItem()
    {

        Cart::add([array(
            '_id' => $this->_id, 
            'name' => $this->name,
            'desc' =>$this->desc,
            'quantity' => $this->quantity,
            'price' => $this->price
        )]);
    }
}