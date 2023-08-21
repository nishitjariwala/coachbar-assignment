import Header from "./Components/Header";
import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import { GlobalContext } from "./context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import ShoppingCart from "./Pages/ShoppingCartPage/Shoppingcart";
import Products from "./Pages/ProductPage/Products";

export default function App() {
  const { userData, navigate, setUserData, updateCart, userLogout } = useContext(GlobalContext);
  const [isLogedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userData"))
  useEffect(()=>{
    console.log(localStorage.getItem("userData"), "dskjgskdjhgkjsdhg")
    if(localStorage.getItem("userData")){
      try{
        setUserData(JSON.parse(localStorage.getItem("userData")))
        setIsLoggedIn(true)  
      } catch {
        userLogout()
      }
      
    }
    if(localStorage.getItem("userCart")){
      try{
        updateCart(JSON.parse(localStorage.getItem("userCart")))
      } catch {
        localStorage.removeItem("userCart")
      }
    }
  },[])

  useEffect(()=>{
    if(userData){
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  },[userData])

  return (
    <div className="App">
      {userData ? <Header /> : null}

      <Routes>
        {isLogedIn ? (
          <>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </>
        ) : (
          <>
            {" "}
            <Route path="/login" exact element={<Login />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={isLogedIn ? "/" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}
