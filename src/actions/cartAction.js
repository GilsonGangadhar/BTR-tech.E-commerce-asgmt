export const addCart = (item) => {
    return {type : "CART", payload : item}
}

export const addToCart = (newBasket) => {
return {type : "ADD_TO_CART", payload : newBasket}
}

export const removeFromCart = (newBasket) => {
return {type : "REMOVE_FROM_CART", payload : newBasket}
}