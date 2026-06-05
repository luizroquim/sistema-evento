import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Registration } from './pages/Registration'; // Importando a sua nova página oficial

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Renderiza a página oficial de inscrição com todas as validações sênior */}
      <Registration />
    </ThemeProvider>
  );
}

export default App;