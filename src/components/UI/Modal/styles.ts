import styled from 'styled-components';

// 1. Fundo escuro que cobre a tela inteira (Overlay)
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  
  /* Efeito sênior: Deixa o que está atrás levemente borrado */
  backdrop-filter: blur(3px); 
  
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  
  /* Animação suave de fade-in no fundo */
  animation: fadeIn 200ms ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// 2. A caixa branca centralizada (Container)
export const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.surface}; /* Branco */
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.card};
  width: 100%;
  max-width: 440px; /* Largura ideal para não ficar gigante na tela */
  padding: 1.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  /* Animação de surgimento: cresce de 95% para 100% escorregando para cima */
  animation: scaleUp 250ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

// 3. Cabeçalho (Título + Botão de Fechar)
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 1.125rem; /* text-lg */
    font-weight: 600;
    color: ${props => props.theme.colors.foreground}; /* Seu verde escuro */
  }

  /* Botão do 'X' */
  button {
    background: none;
    border: none;
    color: ${props => props.theme.colors.placeholder};
    cursor: pointer;
    transition: color 150ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 4px;

    &:hover {
      color: ${props => props.theme.colors.foreground};
      background-color: #f2f7f4; /* Mesmo verde lavado do seu input hover */
    }
  }
`;

// 4. Corpo do texto informativo
export const Content = styled.div`
  font-size: 0.875rem; /* text-sm */
  line-height: 1.5;
  color: ${props => props.theme.colors.foreground};
  opacity: 0.85;
`;

// 5. Rodapé (Alinhamento dos botões de ação)
export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Empurra os botões para a direita */
  gap: 0.75rem;
  margin-top: 0.5rem;

  /* Força uma largura mínima confortável para os botões dentro do modal */
  button {
    padding: 0 1.25rem;
    min-width: 100px;
  }
`;