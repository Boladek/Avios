import React from 'react';
import Products from "./Products";

export default function Main(props) {
    const { products, cartItems, setCartItems} = props;
    return (
        <div className="products">
            <Products products={products} cartItems={cartItems} setCartItems={setCartItems}/>
        </div>
    )
}
