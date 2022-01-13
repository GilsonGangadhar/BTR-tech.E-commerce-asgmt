import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartAction";

function Checkout() {
  const dispatch = useDispatch();
  const storedCart = useSelector((state) => state.cart);

  console.log(storedCart, "cart in checkout");

  const handleClickAdd = (item) => {
    
    let newItem = {...item, count : item.count +1};
    const objIndex =  storedCart.findIndex((item) => item.title === newItem.title);

    let newCartArray = [...storedCart];
    newCartArray[objIndex] = newItem; 

    console.log(newCartArray, "add");
    dispatch(addToCart(newCartArray));
  };

  const handleClickRemove = (item) => {
    if(!item.count <= 0){

    let newItem = {...item, count: item.count-1};

    const objIndex =  storedCart.findIndex((item) => item.title === newItem.title);
    let newCartArray = [...storedCart];

    newCartArray[objIndex] = newItem; 
    console.log(newCartArray, "remove");

    dispatch(removeFromCart(newCartArray));
    }  
    
  };

  /*
  Item cost{" "} {item.unit}{Number(item.price * item.count)}
  
  
  
  */

  return (
    <div>
      <span>
        <h1>Basket - {storedCart.length}</h1>
      </span>
      {storedCart.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.unit}</p>
          <h3>{item.price}</h3>
          <span>
          <button onClick={() => handleClickAdd(item)}>+</button>
          <h4>{item.count}</h4>
          <button onClick={() => handleClickRemove(item)}>-</button>
          </span>
          <p>{`Item Price ${item.unit}${item.price} * ${item.count} `} = {item.unit}{(item.price * item.count).toFixed(2)}</p>
          
          {/* savings */}

          {item.title === "Bread" && (<span><p>Savings{" "} £{item.price/2}</p></span>)}

          {item.title === "Cheese" && (<span><p>Savings{" "} £{item.price/2}</p><p>{`(Buy 1 get 1 free)`}</p></span>)}

          {item.title === "Butter" && (<span><p>Savings{" "} £{(item.price/3).toFixed(2)}</p></span>)}

          
          {/* ṭotal cost */}
          {item.title === "Milk" && (<div>Item cost{" "} {item.unit}{(item.price * item.count).toFixed(2)}</div>) }

          {item.title === "Soup" && (<div>Item cost{" "} {item.unit}{(item.price * item.count).toFixed(2)}</div>)}

          {item.title === "Bread" && (<div>Item cost{" "} {item.unit}{((item.price * item.count) - item.price/2).toFixed(2)}</div>)}

          {item.title === "Cheese" && (<div><p>Item cost{" "} {item.unit}{(item.price/2 * item.count).toFixed(2)}</p></div>)}

          {item.title === "Butter" && (<div><p>Item cost{" "} {item.unit}{((item.price * item.count) - item.price/3).toFixed(2)}</p></div>) }
        </div>
      ))}
     {/* <h3>Sub Total: </h3>
     <h3>Savings: </h3>
     <h3>Total Amount: </h3> */}
    </div>
  );
}

export default Checkout;
