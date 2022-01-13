import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data from "../../data.json";
import {addCart} from '../../actions/cartAction'
import "./homescreen.css"

function HomeScreen() {
    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setProducts([...products, ...data])
    }, []);


const handleClick = (item) => {
// setCart([...cart, item]);
dispatch(addCart(item))
}

  return (
    <div className="container">
      <span><h1>Product listing</h1></span>
      <div className="product__listing">
          {
              products.map(product => (
                  <div className="product__card" key={product.id}>
                      <h4>{product.title}</h4>
                      <p>{product.unit}</p>
                      <p>{product.price}</p>
                      <button onClick={() => handleClick(product)}>Add to Cart</button>
                  </div>
              ))
          }
         
      </div>
    </div>
  );
}

export default HomeScreen;
