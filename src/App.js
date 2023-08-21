import Header from "./Components/Header";
import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlogList from "./Pages/Blogs/BlogList";
import Login from "./Pages/LoginPage/Login";
import GlobalState, { GlobalContext } from "./context/GlobalContext";
import { useContext, useEffect } from "react";

export default function App() {
  const { userData, navigate } = useContext(GlobalContext);
  // useEffect(()=>{
  //   if(userData){
  //     navigate('/')
  //   } else {
  //     navigate('/login')
  //   }
  // },[userData])

  return (
    <div className="App">
      {userData ? <Header /> : null}

      <Routes>
        {userData ? (
          <>
            <Route path="/" element={<BlogList />} />
          </>
        ) : (
          <>
            {" "}
            <Route path="/login" exact element={<Login />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={userData ? "/" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}
