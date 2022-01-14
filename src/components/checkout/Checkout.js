import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartAction";
import "./checkout.css";

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
    <div className="checkbox_container">
      <div className="checkout__listing">
        <h1>Basket ({storedCart.length} - Items)</h1>
        <div className="checkout_scrollable" id="style-1">
          {storedCart.map((item, index) => {
            return (
              <div key={index} className="checkout__part">
                <div className="checkout__card">
                  <h4>{item.title}</h4>
                  <p>
                    {item.unit}
                    {item.price}
                  </p>
                  <button onClick={() => handleClickAdd(item)}>+</button>
                  <span>{item.count}</span>
                  <button onClick={() => handleClickRemove(item)}>-</button>
                </div>

                <div className="checkoutCard__details">
                  <p>
                    {`Item Price${" "}${item.unit}${item.price} * ${item.count} `} ={" "}
                    {item.unit}
                    {(item.price * item.count).toFixed(2)}
                  </p>

                  {/* savings */}

                  {item.savings > 0 ? (
                    <p className="checkoutCard__savings">
                      Savings £{item.savings.toFixed(2)}
                    </p>
                  ) : (
                    <></>
                  )}

                  {/* ṭotal cost */}
                  <p>
                    Item cost {item.unit}
                    {item.itemFinalCost}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="checkout__total">
        <p>{`Sub Total:`}</p>{" "}
        <p>{`£${storedCart
          ?.reduce(function (sum1 = 0, item) {
            return (sum1 = sum1 + item.price * item.count);
          }, 0)
          .toFixed(2)}`}</p>
      </div>
      <div className="checkout__total">
        <p>{`Savings:`}</p>{" "}
        <p>{`£${storedCart
          ?.reduce(function (sum2 = 0, item) {
            return (sum2 = sum2 + item.savings);
          }, 0)
          .toFixed(2)}`}</p>
      </div>
      <div className="checkout__total">
        <p style={{fontWeight: "bold"}}>{`Total Amount:`}</p>{" "}
        <p style={{fontWeight: "bold"}}>{`£${storedCart
          ?.reduce(function (result = 0, item) {
            return (result = result + Number(item.itemFinalCost));
          }, 0)
          .toFixed(2)}`}</p>
      </div>
    </div>
  );
}

export default Checkout;
