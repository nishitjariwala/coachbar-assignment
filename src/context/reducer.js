export const globalReducer = (state, {type, payload}) => {
  switch (type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: payload
      };
    case "USER_LOGOUT":
      return payload;
    case "SET_PRODUCTS_DATA":
      return {
        ...state,
        products: payload
      }
    case "UPDATE_CART":
      return {
        ...state,
        cartProducts: payload
      }
    default:
      return state;
  }
};
