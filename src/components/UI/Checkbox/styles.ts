import styled from 'styled-components';

interface StyledProps {
  $hasError?: boolean;
}

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const LabelWrapper = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`;

// Esconde o checkbox padrão do navegador, mas mantém ele acessível para teclado (Tab)
export const HiddenCheckbox = styled.input<StyledProps>`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

interface StyledCheckboxProps {
  $hasError?: boolean;
}

// A nossa caixinha customizada esverdeada
export const StyledCheckbox = styled.div<StyledCheckboxProps>`
  width: 1.125rem;
  height: 1.125rem;
  border: 1px solid ${props => 
    props.$hasError ? props.theme.colors.error : props.theme.colors.border
  };
  background-color: #f2f7f4; /* Mesmo verde lavado do seu input */
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease-in-out;
  flex-shrink: 0;
  margin-top: 0.125rem; /* Ajuste fino para alinhar com a primeira linha do texto */

  /* Quando o input escondido for focado via teclado, acende a borda */
  ${HiddenCheckbox}:focus + & {
    border-color: ${props => props.theme.colors.borderFocus};
  }

  /* Quando estiver marcado, o fundo vira o seu verde floresta escuro */
  ${HiddenCheckbox}:checked + & {
    background-color: ${props => props.theme.colors.borderFocus};
    border-color: ${props => props.theme.colors.borderFocus};

    /* Desenha o sinal de visto (✓) usando bordas CSS puras */
    &::after {
      content: '';
      display: block;
      width: 0.25rem;
      height: 0.5rem;
      border: solid #ffffff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      margin-bottom: 2px; /* Ajuste fino do check */
    }
  }

  &:hover {
    border-color: ${props => 
      props.$hasError ? props.theme.colors.error : props.theme.colors.borderFocus
    };
    background-color: #ebf2ee;
  }
`;

export const LabelText = styled.span`
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${props => props.theme.colors.foreground};
  
  a {
    color: ${props => props.theme.colors.borderFocus};
    text-decoration: underline;
    font-weight: 500;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

// Reaproveitamos exatamente a mesma animação e estilo do erro do seu Input
export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.theme.colors.error};
  animation: fadeIn 200ms ease-in-out;

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