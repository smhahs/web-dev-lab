import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton, Paper, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/slices/cartSlice';
import { translations } from '../utils/translations';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { current } = useSelector((state) => state.lang);
  const t = translations[current];

  if (items.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">{t.cart}</Typography>
        <Typography sx={{ mt: 2 }} color="text.secondary">{t.emptyCart}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }} maxWidth="md">
      <Typography variant="h4" gutterBottom>{t.cart}</Typography>
      <Paper elevation={3}>
        <List>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="secondary" onClick={() => dispatch(removeFromCart(item.id))}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity} | Price: ${item.price}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Button 
            sx={{ m: 2 }} 
            variant="contained" 
            color="secondary" 
            onClick={() => dispatch(clearCart())}
        >
            Clear Cart
        </Button>
      </Paper>
    </Container>
  );
};

export default CartPage;