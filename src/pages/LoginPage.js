import React, { useState } from 'react'; // Добавили useState для лоадера кнопки
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { translations } from '../utils/translations';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current } = useSelector((state) => state.lang);
  const t = translations[current];
  const [loginError, setLoginError] = useState(null); // Локальный стейт для ошибки входа

  // Имитация базы данных (Правильные данные для входа)
  const CORRECT_CREDENTIALS = {
    email: "admin@jade.com",
    password: "password123"
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t.invalidEmail)
      .required(t.required),
    password: Yup.string()
      .min(6, t.shortPassword)
      .required(t.required),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setLoginError(null); // Сбрасываем старые ошибки
      
      // Имитируем задержку сети (как будто запрос идет на сервер)
      setTimeout(() => {
        // СТРОГАЯ ПРОВЕРКА (Вместо реального бэкенда)
        if (
          values.email === CORRECT_CREDENTIALS.email && 
          values.password === CORRECT_CREDENTIALS.password
        ) {
          // Успех!
          console.log('Login successful');
          dispatch(loginSuccess({ 
            user: { name: 'Dragon Master', email: values.email }, 
            token: 'fake-jwt-token-secret-123' 
          }));
          navigate('/'); 
        } else {
          // Ошибка!
          setLoginError(current === 'ru' ? 'Неверный email или пароль' : 'Invalid email or password');
          setSubmitting(false); // Разблокируем кнопку
        }
      }, 1500); // Ждем 1.5 секунды
    },
  });

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {t.login}
        </Typography>

        
        <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
          Test Account:<br/>
          <b>Email:</b> admin@jade.com<br/>
          <b>Pass:</b> password123
        </Alert>

        {/* Ошибка если данные неверные */}
        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}
        
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label={t.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            disabled={formik.isSubmitting} // Блочим пока грузит
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label={t.password}
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            disabled={formik.isSubmitting}
          />

          <Button 
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit" 
            sx={{ mt: 3 }}
            disabled={formik.isSubmitting} // Кнопка неактивна при загрузке
          >
            {formik.isSubmitting ? 'Checking...' : t.submit}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;