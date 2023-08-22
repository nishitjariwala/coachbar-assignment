import React, { useContext } from 'react';
import { Container, List, Button, Typography } from '@mui/material';
import { GlobalContext } from '../../context/GlobalContext';
import CartItem from '../../Components/CartItem';

const CartPage = ({ updateCartItemQuantity, removeCartItem }) => {
  const { cartProducts, products } = useContext(GlobalContext);

  return (
    <Container>
      <List>
        {cartProducts.length ? cartProducts.map((cartItem) => {
          const { id } = cartItem;
          const product = products.find((product) => product.id === id);

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
            return null; // Handle case where the product is not found
          }
        }) : <Typography variant='h4'>No Products in Cart</Typography> }
      </List>
    </Container>
  );
};

export default CartPage;
