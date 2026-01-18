import React, { useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice'; // Наш thunk
import { addToCart } from '../store/slices/cartSlice';
import { translations } from '../utils/translations';

const HomePage = () => {
  const dispatch = useDispatch();
  
  // Достаем данные из Redux (товары + статус загрузки)
  const { items, status, error } = useSelector((state) => state.products);
  
  // Достаем переводы
  const { current } = useSelector((state) => state.lang);
  const t = translations[current];

  // useEffect запускается при открытии страницы
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Обработка состояний (Loading / Error)
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Error loading tea: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{t.welcome}</Typography>
      <Grid container spacing={3}>
        {items.map((item, index) => {
          // MAGIC TRICK: Берем данные с сервера, но подставляем текст из перевода
          // Если переводов меньше чем товаров, берем дефолтное название с сервера
          const localData = t.products[index] || { name: item.title, desc: item.description };
          
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Картинка (можно заменить на чайную, но пока оставим пустой плейсхолдер или без нее) */}
                <Typography variant="h6">{localData.name}</Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mt: 1 }}>
                  {localData.desc}
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Цену берем реальную с API и умножаем для вида (типа рубли/юани) */}
                  <Typography variant="h6" color="primary">
                    {current === 'en' ? `$${item.price}` : `¥ ${Math.round(item.price * 7)}`}
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => dispatch(addToCart({ 
                      id: item.id, 
                      name: localData.name, 
                      price: item.price 
                    }))}
                  >
                    {t.buy}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default HomePage;