import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const ListBlogs = () => {
  const { userData } = useContext(GlobalContext);
  console.log(userData);
  const getData = () => {
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
        // console.log(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Link to="/login">Login</Link>
    </>
  );
};

export default ListBlogs;
