<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function index()
    {
        $products = Product::query();
        if(request('search')){
            return $products->where('name', 'like', '%' . request('search') . '%')
            ->orderBy('id' , 'desc')->get();
        }else{
        // $product = Product::orderBy('id' , 'desc')->get();
        // return response()->json($product);
        // return Product::orderBy('id' , 'desc')->paginate(5);
        return $products->orderBy('id' , 'desc')->get();}
        // Product::when(request('search') , function($query){
        //     $query->where('name', 'like', '%' . request('search') . '%');
        // })->orderBy('id' , 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric'
        ],[
            'name.required' => 'فیلد نام الزامی است',
            'name.string' => 'فیلد نام باید رشته باشد',
            'price.required' => 'فیلد قیمت الزامی است',
            'price.numeric' => 'فیلد فیمت باید عدد باشد'
        ]);
        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();
        return $product; 
        
        // $product = Product::created($request->all());
        
        

        // $product = Product::created($request->only('name' , 'price'));

        // return $product;
    }

 
    // public function show($id)
    // {
    //     $product = Product::find($id);
        
    //     return $product;
    // }
    public function show(Product $product)
    {
        return $product;
    }


    /*public function update(ProductUpdateRequest $request, $id)
    {
        $product = Product::find($id);
        $product->update($request->only('name' , 'price'));
        
        return $product;
    }*/
    public function update(Request $request,Product $product)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric'
        ],[
            'name.required' => 'فیلد نام الزامی است',
            'name.string' => 'فیلد نام باید رشته باشد',
            'price.required' => 'فیلد قیمت الزامی است',
            'price.numeric' => 'فیلد فیمت باید عدد باشد'
        ]);
        
        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();

        // $product->update($request->only('name' , 'price'));
        // return $product;
    }

    
    public function destroy(Product $product)
    {
        $product->delete();
        
        return $product;
    }
    // public function destroy($id)
    // {
    //     $product = Product::find($id);
    //     $product->delete();
        
    //     return $product;
    // }
}

// https://www.youtube.com/c/thetminnhtun
