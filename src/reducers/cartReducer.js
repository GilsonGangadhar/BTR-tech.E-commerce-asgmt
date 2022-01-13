export const cartReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "CART":
      return state.concat(payload);

    case "ADD_TO_CART":
      return [...payload];

    case "REMOVE_FROM_CART":
      return [...payload];

    default:
      return state;
  }
};
