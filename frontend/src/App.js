import './App.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  async function callApi () {
    const {data} = await Axios.get("http://localhost:3001/products")
    setProducts(data);
  }

  useEffect(() => {
    callApi();
    console.log(cartItems);
  }, [])

  return (
    <div className="App">
      SHOPPING CART
      <Header />
      <div className="body">
        <Main products={products} cartItems={cartItems} setCartItems={setCartItems} />
        <Basket products={products} cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
}

export default App;
