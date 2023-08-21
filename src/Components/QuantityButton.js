import { Button, ButtonGroup } from '@mui/material';
import React from 'react';

const QuantityButton = (props) => {
    const { handleQuantityChange, setSize, quantity, stock } = props
    return (
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
    )
}
export default QuantityButton