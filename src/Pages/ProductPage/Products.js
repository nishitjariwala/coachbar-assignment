import { Container, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../Components/ProductCard";
import { GlobalContext } from "../../context/GlobalContext";

const Products = () => {
  const { userData, getProductsData, products, cartProducts } = useContext(GlobalContext);
  console.log(userData);
  useEffect(() => {
    getProductsData();
  }, []);
  console.log("products", cartProducts)
  return (
    <Container>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
