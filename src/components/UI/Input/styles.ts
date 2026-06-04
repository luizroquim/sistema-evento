import styled from 'styled-components';

interface StyledInputProps {
  $hasError?: boolean;
}

// 1. Container principal que empilha Label, Input e Erro na vertical
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.375rem; 
`;

// 2. Etiqueta do campo (Label)
export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.foreground}; /* Verde escuro floresta */
`;

// 3. O Campo de digitação (Input)
export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  min-height: 2.75rem;
  padding: 0 1rem;
  
  font-size: 0.875rem;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.foreground};
  border-radius: ${props => props.theme.borderRadius.input};
  
  /* Borda base de 1px padrão */
  border: 1px solid ${props => 
    props.$hasError ? props.theme.colors.error : props.theme.colors.border
  };
  
  /* Transição rápida para o efeito ficar responsivo ao clique */
  transition: all 150ms ease-in-out;
  outline: none;

  &::placeholder {
    color: ${props => props.theme.colors.placeholder};
    opacity: 0.7;
  }

  /* Hover apenas muda a cor da linha de leve, sem sombra */
  &:hover:not(:disabled) {
    border-color: ${props => 
      props.$hasError ? props.theme.colors.error : props.theme.colors.borderFocus
    };
  }

  /* Foco refinado: Linha verde e uma sombra bem fina de 2px */
  &:focus {
    border-color: ${props => 
      props.$hasError ? props.theme.colors.error : props.theme.colors.borderFocus
    };
    
  }

  &:disabled {
    background-color: ${props => props.theme.colors.background};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// 4. Mensagem de Erro dinâmica posicionada logo abaixo do campo
export const ErrorMessage = styled.span`
  display: flex;
  align-items: center; /* Alinha o ícone e o texto verticalmente no centro */
  gap: 0.25rem; /* Espaçamento curto entre o ícone e o começo da frase */
  
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.theme.colors.error};
  
  /* Mantém a nossa animação sênior de escorregar suave */
  animation: fadeIn 200ms ease-in-out;

  /* Garante que o ícone não encolha se o texto do erro for muito longo */
  svg {
    flex-shrink: 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;