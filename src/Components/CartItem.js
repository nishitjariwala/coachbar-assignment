import React, { useContext } from 'react';
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
import { GlobalContext } from '../context/GlobalContext';

const CartItem = ({ cartItem, product }) => {
  const { id, quantity } = cartItem;
  const { title, price, setSize, stock } = product;
  const {updateCart, cartProducts} = useContext(GlobalContext)

  return (
    <ListItem key={id} disableGutters>
      <ListItemText
        primary={title}
        secondary={`Price: $${price.toFixed(2)}, Set Size: ${setSize}`}
      />
      <QuantityButton productInCart={cartItem} product={product} /> 
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={()=>updateCart(cartProducts.filter(product=>product.id!==id))}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CartItem;
