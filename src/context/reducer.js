export const globalReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
        isLogedIn: true
      };
    case "USER_LOGOUT":
      return {
        ...state,
        userData: undefined,
        isLogedIn: false
      };
    default:
      return state;
  }
};
