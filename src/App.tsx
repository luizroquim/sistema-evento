import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Input } from './components/UI/Input';
import { Button } from './components/UI/Button';
import { Modal } from './components/UI/Modal';
import { Checkbox } from './components/UI/Checkbox'; // <-- Importando o seu novo Checkbox

function App() {
  const [nome, setNome] = useState('');
  const [aceitouTermos, setAceitouTermos] = useState(false);
  
  // Estados de erro isolados
  const [erroNome, setErroNome] = useState('');
  const [erroTermo, setErroTermo] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Validação local simulando o que o Yup vai fazer depois
  const lidarComPreEnvio = () => {
    let temErro = false;

    if (!nome) {
      setErroNome('O campo Nome Completo é obrigatório para a inscrição!');
      temErro = true;
    } else {
      setErroNome('');
    }

    if (!aceitouTermos) {
      setErroTermo('Você precisa ler e aceitar o regulamento para continuar.');
      temErro = true;
    } else {
      setErroTermo('');
    }

    // Se passou pelas validações, abre o Modal de confirmação
    if (!temErro) {
      setIsModalOpen(true);
    }
  };

  // 2. Envio final pós-confirmação do Modal
  const lidarComConfirmacaoFinal = async () => {
    setIsModalOpen(false);
    setIsSubmitting(true);

    // Simula o salvamento na API externa
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    alert(`Sucesso! Inscrição de ${nome} foi enviada.`);
    
    // Limpa os campos após o sucesso
    setNome('');
    setAceitouTermos(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '420px',
        margin: '60px auto',
        padding: '2.5rem',
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.borderRadius.card,
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ color: theme.colors.foreground, textAlign: 'center', fontFamily: 'sans-serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Inscrição do Concurso
        </h2>

        {/* Input de Nome */}
        <Input 
          id="nome-completo"
          label="Nome Completo" 
          placeholder="Digite seu nome..."
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (e.target.value) setErroNome('');
          }}
          error={erroNome}
        />

        {/* O SEU NOVO COMPONENTE DE CHECKBOX */}
        <Checkbox
          id="termo-concurso"
          value="aceito"
          checked={aceitouTermos}
          onChange={(e) => {
            setAceitouTermos(e.target.checked);
            if (e.target.checked) setErroTermo('');
          }}
          error={erroTermo}
          label={
            <>
              Li e concordo com o{' '}
              <a href="#regulamento" onClick={(e) => {
                e.preventDefault();
                alert('Aqui abriria o texto completo do regulamento do concurso!');
              }}>
                Regulamento Oficial do Concurso
              </a>.
            </>
          }
        />

        {/* Botão Principal */}
        <Button 
          variant="primary" 
          onClick={lidarComPreEnvio}
          isLoading={isSubmitting}
        >
          Enviar Inscrição
        </Button>
      </div>

      {/* Modal de Confirmação */}
      <Modal
        isOpen={isModalOpen}
        title="Confirmar Dados"
        onClose={() => setIsModalOpen(false)}
        onConfirm={lidarComConfirmacaoFinal}
      >
        <p>Olá, <strong>{nome}</strong>!</p>
        <p style={{ marginTop: '0.5rem', color: '#666' }}>
          Sua inscrição será enviada para o sistema do concurso. Confirma o envio das informações preenchidas?
        </p>
      </Modal>
    </ThemeProvider>
  );
}

export default App;