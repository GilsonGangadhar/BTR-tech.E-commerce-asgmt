
export const cartReducer = (state = {
    cart : []
}, action) => {
    const {type, payload} = action
switch(type){

    case "ADD_CARTS" : 
    return{
        cart : [...state.cart, ...payload]
    }

    default:
        return state
}
}

