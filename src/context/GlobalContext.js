import { createContext, useReducer } from "react";
import { globalReducer } from "./reducer";
import { useNavigate } from "react-router-dom";

const initState = {
  todos: [],
  userData: undefined,
  isLogedIn: false
};

export const GlobalContext = createContext(initState);

const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initState);
  const navigate = useNavigate();
  const getUserData = (data) => {
    dispatch({
      type: "GET_USER_DATA",
      payload: data
    });
  };

  const userLogout = (data) => {
    dispatch({
      type: "USER_LOGOUT"
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        userData: state.userData,
        isLogedIn: state.isLogedIn,
        getUserData,
        userLogout,
        navigate
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
