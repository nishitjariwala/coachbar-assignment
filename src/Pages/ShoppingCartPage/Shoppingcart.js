import React, { useContext, useEffect } from 'react';
import { Container, List, Button, Typography } from '@mui/material';
import { GlobalContext } from '../../context/GlobalContext';
import CartItem from '../../Components/CartItem';

const CartPage = ({ updateCartItemQuantity, removeCartItem }) => {
  const { cartProducts, products, getProductsData } = useContext(GlobalContext);
  useEffect(()=>{
      if(!products.length){
        getProductsData()
      }
  },[])

  return (
    <Container>
      <List>
        {cartProducts.length ? cartProducts.map((cartItem) => {
          const { id } = cartItem;
          const product = products.find((product) => product.id === id);
            console.log("sdfjsdf", products)
          if (product) {
            return (
              <CartItem
                key={id}
                cartItem={cartItem}
                updateCartItemQuantity={updateCartItemQuantity}
                removeCartItem={removeCartItem}
                product={product}
              />
            );
          } else {
              console.log("here")
            return null;
          }
        }) : <Typography variant='h4'>No Products in Cart</Typography> }
      </List>
    </Container>
  );
};

export default CartPage;
