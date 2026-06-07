import styled, { css } from 'styled-components';

interface StyledButtonProps {
  $variant: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  border-radius: ${({ theme }) => theme.borderRadius.button}; /* Usa os 8px (0.5rem) do tema */
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  /* TRAVA DE SIMETRIA (TAMANHO IGUAL) */
  width: 180px; 
  
  /* ALINHAMENTO DO TEXTO NA ESQUERDA E ÍCONE NA DIREITA */
  display: inline-flex;
  align-items: center;
  justify-content: space-between; /* <-- MUDANÇA AQUI: Joga o texto pra esquerda e o ícone pra direita */
  gap: 0.5rem;
  
  /* CORES VINDAS DIRETO DO SEU THEME.TS */
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.action.secondary}; /* Usa a cor de borda neutra */
  color: ${({ theme }) => theme.colors.foreground}; /* Usa o seu Verde Floresta para o texto/ícone */

  /* Garante que o ícone do Lucide mantenha a proporção e não esmague */
  svg {
    flex-shrink: 0;
  }

  /* ESTADOS (HOVER E DISABLED) */
  &:hover {
    background-color: rgba(0, 0, 0, 0.02); /* Um detalhe sutil por cima do Bege de fundo */
    border-color: ${({ theme }) => theme.colors.borderFocus}; /* Destaca usando seu verde escuro */
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Se você precisar usar as outras variantes (primary, ghost) no futuro, elas já herdam o tamanho */
  ${({ theme, $variant }) => {
    if ($variant === 'ghost') {
      return css`
        background-color: transparent;
        color: ${theme.colors.error};
        border-color: transparent;
        &:hover {
          background-color: rgba(239, 68, 68, 0.05);
          border-color: transparent;
        }
      `;
    }
  }}
`;