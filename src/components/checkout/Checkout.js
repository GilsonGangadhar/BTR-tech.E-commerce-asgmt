import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartAction";

function Checkout() {
  const dispatch = useDispatch();
  const storedCart = useSelector((state) => state.cart);

  console.log(storedCart, "cart in checkout");

  const handleAddClick = (item) => {
    
    let newItem = {...item, count : item.count +1};
    const objIndex =  storedCart.findIndex((item) => item.title === newItem.title);

    let newCartArray = [...storedCart];
    newCartArray[objIndex] = newItem; 

    console.log(newCartArray, "add");
    dispatch(addToCart(newCartArray));
  };

  const handleRemoveClick = (item) => {
    if(!item.count <= 0){
        
    let newItem = {...item, count : item.count-1};

    const objIndex =  storedCart.findIndex((item) => item.title === newItem.title);
    let newCartArray = [...storedCart];

    newCartArray[objIndex] = newItem; 
    console.log(newCartArray, "remove");

    dispatch(removeFromCart(newCartArray));
    }  
    
  };

  return (
    <div>
      <span>
        <h1>Basket - {storedCart.length}</h1>
      </span>
      {storedCart.map((item, index) => (
        <div key={index}>
          <h4>{item.title}</h4>
          <p>{item.unit}</p>
          <p>{item.price}</p>
          <button onClick={() => handleAddClick(item)}>+</button>
          <p>{item.count}</p>
          <button onClick={() => handleRemoveClick(item)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default Checkout;
