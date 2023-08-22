import { createContext, useReducer } from "react";
import { globalReducer } from "./reducer";
import { useNavigate } from "react-router-dom";

const initState = {
  todos: [],
  userData: localStorage.getItem("userCart") ? JSON.parse(localStorage.getItem("userCart")) : undefined,
  isLogedIn: false,
  products: [],
  cartProducts: []
};

export const GlobalContext = createContext(initState);

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initState);
  const navigate = useNavigate();
  const setUserData = (data) => {
    dispatch({
      type: "SET_USER_DATA",
      payload: data
    });
  };


  const getProductsData = () => {
    fetch("./products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        dispatch({
          type: "SET_PRODUCTS_DATA",
          payload: myJson
        })
      });
    
  }


  const updateCart = (data) => {
    localStorage.setItem("userCart", JSON.stringify(data))
    dispatch({
      type: "UPDATE_CART",
      payload: data
    })
  }

  const userLogout = (data) => {
    localStorage.clear()
    dispatch({
      type: "USER_LOGOUT",
      payload: initState
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        userData: state.userData,
        products: state.products,
        cartProducts: state.cartProducts,
        setUserData,
        userLogout,
        navigate,
        getProductsData,
        updateCart
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
