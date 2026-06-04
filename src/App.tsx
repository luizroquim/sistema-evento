import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';



function App() {
  return (
    <ThemeProvider theme={theme}>
     <p>teste</p>
    </ThemeProvider>
  );
}

export default App;