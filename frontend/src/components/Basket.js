import React from 'react'

export default function Basket(props) {
    const {cartItems, setCartItems} = props;
    console.log(props, "props");
    return (
        <div className="basket">
            <h1>CART ITEMS</h1>
            <div>{cartItems.length === 0 && <div>Cart is empty</div>}</div>
            <div>
                {cartItems.length > 0 && 
                <div>
                    <ul>
                       <li>Total Cart Item(s): {cartItems.length}</li>
                       <li>Total price of Cart Item: {cartItems.reduce((a, b) => a.price + b.price)}</li>
                       <li>Shipping Fee: {Math.ceil(cartItems.reduce((a, b) => a.price + b.price) * 0.008)}</li>
                       <hr></hr>
                       <li>Total price: {cartItems.reduce((a, b) => a.price + b.price) + Math.ceil(cartItems.reduce((a, b) => a.price + b.price) * 0.008)}</li> 
                    </ul>
                    <div><button 
                        onClick={() => {
                            setCartItems([]);
                        }}>Clear Cart
                        </button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
