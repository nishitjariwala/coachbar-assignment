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
    const { updateCart, cartProducts } = useContext(GlobalContext)
    const { id, images, title, price, stock, setSize = 1 } = product;
    const productInCart = cartProducts.find((item) => item.id === id);

    const [quantity, setQuantity] = useState(productInCart ? productInCart.quantity : setSize);
    const [isAddingToCart, setIsAddingToCart] = useState(!!productInCart);


    const handleQuantityChange = (amount) => {
        const newQuantity = quantity + amount;
        if (newQuantity >= 0 && newQuantity <= stock && newQuantity % setSize === 0) {
            setQuantity(newQuantity);
            if (productInCart && newQuantity === 0) {
                setIsAddingToCart(false)
                const updatedCartProducts = cartProducts.filter((item) => item.id !== id);
                console.log(`Removed ${title} from cart`);
                updateCart(updatedCartProducts)
            } else {
                const updatedCartProducts = cartProducts.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
                updateCart(updatedCartProducts)
                console.log(`Updated quantity of ${title} to ${quantity}`);
            }
        }
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} ${title} to cart`);
        updateCart([...cartProducts, {id, quantity}])
        setIsAddingToCart(true);
    };

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
                                badgeContent={`Only ${stock} left!`}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
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
            <CardActions style={{ justifyContent: 'flex-end' }}>
                {stock < 1 ? (
                    <Typography variant="body2" color="error">
                        Out of Stock
                    </Typography>
                ) : isAddingToCart ? (
                    <QuantityButton handleQuantityChange={handleQuantityChange} setSize={setSize} quantity={quantity} stock={stock} />
                ) : (
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProductCard;
