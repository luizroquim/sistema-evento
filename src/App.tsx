import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Input } from './components/UI/Input';
import { Button } from './components/UI/Button';

function App() {
  const [nome, setNome] = useState('');
  const [erroSimulado, setErroSimulado] = useState('');

  const dispararErro = () => {
    if (!nome) {
      setErroSimulado('O campo Nome Completo é obrigatório para a inscrição!');
    } else {
      setErroSimulado('');
      alert(`Sucesso! Nome digitado: ${nome}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '400px',
        margin: '80px auto',
        padding: '2.5rem',
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.borderRadius.card,
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ color: theme.colors.foreground, textAlign: 'center', fontFamily: 'sans-serif' }}>
          Laboratório de Inputs
        </h2>

        <Input 
          id="nome-completo"
          label="Nome Completo" 
          placeholder="Digite seu nome para o evento..."
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (e.target.value) setErroSimulado('');
          }}
          error={erroSimulado}
        />

        <Input 
          id="campo-bloqueado"
          label="Código do Cupom (Opcional)" 
          placeholder="Cupom indisponível"
          disabled 
        />

        <Button variant="primary" onClick={dispararErro}>
          Validar Campo
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;