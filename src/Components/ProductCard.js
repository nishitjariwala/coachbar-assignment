import React, { useContext, useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    ButtonGroup,
} from '@mui/material';
import { Badge } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import QuantityButton from './QuantityButton';
import { GlobalContext } from '../context/GlobalContext';

const ProductCard = ({ product }) => {
    const { cartProducts } = useContext(GlobalContext)
    const { id, images, title, price, stock, setSize = 1 } = product;
    const productInCart = cartProducts.find((item) => item.id === id);

    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Carousel showThumbs={false} infiniteLoop>
                {images.map((image, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <img
                            src={image}
                            alt={`${title} - ${index}`}
                            style={{ maxHeight: '200px', width: 'auto' }}
                        />
                        {stock > 0 && stock < 5 && (
                            <Badge
                                color="error"
                                badgeContent={`${stock} left!`}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                }}
                            ></Badge>
                        )}
                    </div>
                ))}
            </Carousel>
            <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                    {title}
                </Typography>
                <Typography variant="body1">${price.toFixed(2)}</Typography>
                <Typography variant="body2">Set Size: {setSize}</Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'space-between' }}>
            <div>sfgs</div>
            <QuantityButton productInCart={productInCart} product={product} />
            </CardActions>
        </Card>
    );
};

export default ProductCard;
