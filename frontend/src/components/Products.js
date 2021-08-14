import React from 'react'

export default function Products(props) {
    const {products, cartItems, setCartItems} = props;
    
    return (
        <div className="products-container" style={{ 
            display: "flex", 
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap" }}>
            {products && products.map(product => (
            <div className="product" style={{ width: 180, height: 350, margin: 20, border: "2px solid black" }}>
                <div style={{ width: "180px", height: "170px" }}>
                    <img src={product.images} style={{ height: "100%", width: "100%", display: "block", objectFit: "cover", borderRadius: 5}} alt="image here"/>
                </div>
                <h3>{product.product_name}</h3>
                <ul>
                    <li>price: {product.price}</li>
                    <li>size: {product.size}</li>
                    <li>color: {product.color}</li>
                    <li>quantity: {product.quantity}</li>
                </ul>
                <div>
                    <button onClick={() => {
                        cartItems.push(product);
                        // console.log(cartItems);
                        setCartItems([...cartItems, product]);
                        console.log(cartItems);
                    }}>Add to Cart</button>
                </div>
            </div>))
        }
        </div>
    )
}
