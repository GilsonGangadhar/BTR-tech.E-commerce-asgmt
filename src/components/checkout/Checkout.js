import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Checkout() {

    const dispatch = useDispatch();
    const storedCart = useSelector((state) => state.cart)

    console.log(storedCart, "cart in checkout")

    return (
        <div>
            <h1>hi there</h1>
            <p>{storedCart.length}</p>
        </div>
    )
}

export default Checkout
