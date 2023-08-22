import { Button, ButtonGroup, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const QuantityButton = (props) => {
  const {  productInCart, product } = props;
  const {setSize=1, stock, id} = product
  const {cartProducts , updateCart} = useContext(GlobalContext)
  const [quantity, setQuantity] = useState(productInCart ? productInCart.quantity : setSize);
  const [isAddingToCart, setIsAddingToCart] = useState(!!productInCart);
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 0 && newQuantity <= stock && newQuantity % setSize === 0) {
      setQuantity(newQuantity);
      if (productInCart && newQuantity === 0) {
        const updatedCartProducts = cartProducts.filter((item) => item.id !== id);
        updateCart(updatedCartProducts)
      } else {
        const updatedCartProducts = cartProducts.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        updateCart(updatedCartProducts)
      }
    }
  };

  const handleAddToCart = () => {
    updateCart([...cartProducts, { id, quantity: setSize }])
    setQuantity(setSize)
    setIsAddingToCart(true);
  };
  return (
    <>
      {stock < 1 ? (
        <Typography variant="body2" color="error">
          Out of Stock
        </Typography>
      ) : isAddingToCart && quantity > 0 ? (
        <ButtonGroup color="primary">
          <Button
            variant="contained"
            onClick={() => handleQuantityChange(-setSize)}
            disabled={quantity < setSize}
          >
            -
          </Button>
          <Button disabled>{quantity}</Button>
          <Button
            variant="contained"
            onClick={() => handleQuantityChange(setSize)}
            disabled={quantity + setSize > stock}
          >
            +
          </Button>
        </ButtonGroup>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      )}
    </>
  )
}
export default QuantityButton