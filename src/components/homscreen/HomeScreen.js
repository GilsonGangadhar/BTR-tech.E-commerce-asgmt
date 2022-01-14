import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "../../data.json";
import { addCart } from "../../actions/cartAction";
import "./homescreen.css";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const storedCart = useSelector((state) => state.cart);

  useEffect(() => {
    setProducts([...products, ...data]);
  }, []);


  const handleClick = (item) => {
    let result =storedCart.map(function(ele) {
      return ele.title
    });

    console.log(result, "condition")
    if (storedCart.length === 0) {
      dispatch(addCart(item));
    } else if (
      storedCart.length > 0 &&
      !result.includes(item.title)
    ) {
      dispatch(addCart(item));
    }
  };

  return (
    <div className="container">
        
      <div className="product__listing">
    <h1>Product listing</h1>
        {products.map((product) => (
          <div className="product__card" key={product.id}>
            <h4>{product.title}</h4>
            
            <p>{product.unit}{product.price}</p>
            <button onClick={() => handleClick(product)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
