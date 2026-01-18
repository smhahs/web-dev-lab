// Функция возвращает настройки темы в зависимости от режима (light/dark)
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#2E7D32', // Насыщенный нефритовый зеленый
      contrastText: '#fff',
    },
    secondary: {
      main: '#D32F2F', // Классический китайский красный (для скидок/кнопок danger)
    },
    background: {
      default: mode === 'light' ? '#f4f4f4' : '#121212', // Чуть серый фон для светлой, чтобы глаза не резало
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',   // Цвет карточек
    },
    text: {
      primary: mode === 'light' ? '#2c3e50' : '#ffffff',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    }
  },
  components: {
    // Тут глобально меняем стиль кнопок, чтобы не были плоскими
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Скругленные углы
        },
      },
    },
  },
});