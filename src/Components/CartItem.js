import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ButtonGroup,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import QuantityButton from './QuantityButton';

const CartItem = ({ cartItem, updateCartItemQuantity, removeCartItem, product }) => {
  const { id, quantity } = cartItem;
  const { title, price, setSize, stock } = product;

  return (
    <ListItem key={id} disableGutters>
      <ListItemText
        primary={title}
        secondary={`Price: $${price.toFixed(2)}, Set Size: ${setSize}`}
      />
      <QuantityButton productInCart={cartItem} product={product} /> 
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={()=>console.log("Delete")}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CartItem;
