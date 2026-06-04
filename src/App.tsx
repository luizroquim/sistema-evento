import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Input } from './components/UI/Input';
import { Button } from './components/UI/Button';
import { Modal } from './components/UI/Modal'; // <-- Importamos o seu novo Modal

function App() {
  const [nome, setNome] = useState('');
  const [erroSimulado, setErroSimulado] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla a abertura do Modal
  const [isSubmitting, setIsSubmitting] = useState(false); // Controla o loading do Botão

  // 1. Primeira validação ao clicar no botão principal
  const lidarComPreEnvio = () => {
    if (!nome) {
      setErroSimulado('O campo Nome Completo é obrigatório para a inscrição!');
    } else {
      setErroSimulado('');
      setIsModalOpen(true); // Se o nome estiver preenchido, abre o Modal de confirmação!
    }
  };

  // 2. Função disparada quando o usuário confirma de verdade dentro do Modal
  const lidarComConfirmacaoFinal = async () => {
    setIsModalOpen(false); // Fecha o modal primeiro
    setIsSubmitting(true); // Ativa o "Enviando..." no botão principal

    // Simula uma requisição para a API de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false); // Desativa o loading
    alert(`Inscrição de ${nome} enviada com sucesso para o banco de dados!`);
    setNome(''); // Limpa o campo
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Card do Formulário */}
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
        <h2 style={{ color: theme.colors.foreground, textAlign: 'center', fontFamily: 'sans-serif', fontSize: '1.5rem' }}>
          Inscrição do Evento
        </h2>

        <Input 
          id="nome-completo"
          label="Nome Completo" 
          placeholder="Digite seu nome..."
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (e.target.value) setErroSimulado('');
          }}
          error={erroSimulado}
        />

        <Button 
          variant="primary" 
          onClick={lidarComPreEnvio}
          isLoading={isSubmitting} // Fica desativado e exibindo "Enviando..." após o modal
        >
          Enviar Inscrição
        </Button>
      </div>

      {/* 3. O SEU COMPONENTE DE MODAL 
          Ele fica monitorando o estado 'isModalOpen'. 
          Graças ao 'if (!isOpen) return null', ele não pesa nada na árvore enquanto fechado.
      */}
      <Modal
        isOpen={isModalOpen}
        title="Confirmar Envio"
        onClose={() => setIsModalOpen(false)} // Se cancelar ou fechar no X, só fecha o modal
        onConfirm={lidarComConfirmacaoFinal}  // Se confirmar, dispara a lógica de envio
      >
        <p>Olá, <strong>{nome}</strong>!</p>
        <p style={{ marginTop: '0.5rem', color: '#666' }}>
          Tem certeza de que revisou seus dados? Após confirmar, sua inscrição será processada e não poderá ser alterada.
        </p>
      </Modal>
    </ThemeProvider>
  );
}

export default App;