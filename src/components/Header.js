import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, MenuItem, Select } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import { setLanguage } from '../store/slices/langSlice'; // Action
import { translations } from '../utils/translations'; // Texts

const Header = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { current } = useSelector((state) => state.lang); // Get current lang
  
  const t = translations[current]; // Helper const

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          🐉 {t.title}
        </Typography>

        {/* Language Switcher */}
        <Select
          value={current}
          onChange={(e) => dispatch(setLanguage(e.target.value))}
          variant="standard"
          sx={{ color: 'inherit', mr: 2, '.MuiSelect-icon': { color: 'inherit' } }}
          disableUnderline
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="ru">RU</MenuItem>
          <MenuItem value="zh">中文</MenuItem>
        </Select>

        <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
          {t.login}
        </Button>

        <IconButton color="inherit" component={Link} to="/cart">
          <ShoppingCartIcon />
        </IconButton>

        <IconButton sx={{ ml: 1 }} onClick={() => dispatch(toggleTheme())} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;