import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartAction";

function Checkout() {

  const dispatch = useDispatch();
  const storedCart = useSelector((state) => state.cart);

  const handleClickAdd = (item) => {
    calculateSpecialOffers(item, item.count + 1);
  };

  const handleClickRemove = (item) => {
    calculateSpecialOffers(item, item.count - 1);
  };

  const calculateSpecialOffers = (cartItem, itemCount) => {
    switch (cartItem.title) {
      case "Butter": {
        let newCartArray = [...storedCart];
        let butterItemIndex = newCartArray.findIndex(
          (item) => item.title === "Butter"
        );

        newCartArray[butterItemIndex] = {
          ...cartItem,
          count: itemCount,
          savings: (cartItem.price * itemCount) / 3,
          itemFinalCost: (
            cartItem.price * itemCount -
            (cartItem.price * itemCount) / 3
          ).toFixed(2),
        };
        dispatch(addToCart(newCartArray));
        return;
      }

      case "Milk": {
        let newCartArray = [...storedCart];
        let milkItemIndex = newCartArray.findIndex(
          (item) => item.title === "Milk"
        );

        newCartArray[milkItemIndex] = {
          ...cartItem,
          count: itemCount,
          itemFinalCost: (cartItem.price * itemCount).toFixed(2),
        };

        dispatch(addToCart(newCartArray));
        return;
      }

      case "Cheese": {
        let newCartArray = [...storedCart];
        let cheeseItemIndex = newCartArray.findIndex(
          (item) => item.title === "Cheese"
        );
        let cheeseSavings = 0.45 * itemCount;
        newCartArray[cheeseItemIndex] = {
          ...cartItem,
          count: itemCount,
          itemFinalCost: (cartItem.price * itemCount - cheeseSavings).toFixed(
            2
          ),
          savings: cheeseSavings,
        };
        dispatch(addToCart(newCartArray));
        return;
      }

      case "Bread": {
        let newCartArray = [...storedCart];
        let breadItemIndex = newCartArray.findIndex(
          (item) => item.title === "Bread"
        );

        newCartArray[breadItemIndex] = {
          ...cartItem,
          count: itemCount,
          itemFinalCost: (cartItem.price * itemCount).toFixed(2),
        };

        dispatch(addToCart(newCartArray));
        return;
      }

      case "Soup": {
        //soup, go modify bread item savings by (0.55 * count
        let newCartArray = [...storedCart];
        let breadItem = newCartArray.find((item) => item.title === "Bread");
        let breadItemIndex = newCartArray.findIndex(
          (item) => item.title === "Bread"
        );

        let soupItem = { ...cartItem };
        let soupItemCount = itemCount;
        let soupItemIndex = newCartArray.findIndex(
          (item) => item.title === "Soup"
        );

        if (breadItem) {
          newCartArray[breadItemIndex] = {
            ...breadItem,
            savings: 0.55 * soupItemCount,
            itemFinalCost: (
              breadItem.price * breadItem.count -
              0.55 * soupItemCount
            ).toFixed(2),
          };
        }

        newCartArray[soupItemIndex] = {
          ...soupItem,
          count: soupItemCount,
          itemFinalCost: (soupItem.price * soupItemCount).toFixed(2),
        };

        dispatch(addToCart(newCartArray));
        return;
      }

      default:
        return cartItem;
    }
  };

  console.log(storedCart, "storedCart");

  return (
    <div>
      <span>
        <h1>Basket - {storedCart.length}</h1>
      </span>
      {storedCart.map((item, index) => {
        return (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.unit}</p>
            <h3>{item.price}</h3>
            <span>
              <button onClick={() => handleClickAdd(item)}>+</button>
              <h4>{item.count}</h4>
              <button onClick={() => handleClickRemove(item)}>-</button>
            </span>
            <p>
              {`Item Price ${item.unit}${item.price} * ${item.count} `} ={" "}
              {item.unit}
              {(item.price * item.count).toFixed(2)}
            </p>

            {/* savings */}
            <span>
              {item.savings > 0 ? (
                <p>Savings £{item.savings.toFixed(2)}</p>
              ) : (
                <></>
              )}
            </span>

            {/* ṭotal cost */}
            <div>
              Item cost {item.unit}
              {item.itemFinalCost}
            </div>
          </div>
        );
      })}
      <br />
      <div>
        <p>{`Sub Total: £${storedCart?.reduce(function (sum1 = 0, item) {
          return (sum1 = sum1 + item.price * item.count);
        },0).toFixed(2)}`}</p>

        <p>{`Savings: £${storedCart?.reduce(function (sum2 = 0, item) {
          return (sum2 = sum2 + item.savings);
        },0).toFixed(2)}`}</p>

        <p>{`Total Amount: £${storedCart?.reduce(function(result=0, item){
         return result = result + Number(item.itemFinalCost)
      },0).toFixed(2)}`}</p>
      </div>
    </div>
  );
}

export default Checkout;
