import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center; /* Centraliza o bloco de paginação na tela inteira */
  align-items: center;
  padding-top: 1.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  box-sizing: border-box;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* No mobile ele ocupa a largura total disponível */
  max-width: 360px; /* Impede que os botões se esparramem no desktop, mantendo-os juntos */
  gap: 1rem;
`;

export const PageInfo = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.foreground}; /* Cinza/bege sutil do tema */
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;
  user-select: none;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 0.85rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input}; /* 6px do seu tema */
  color: ${({ theme }) => theme.colors.foreground}; /* Seu verde floresta padrão */
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  height: 38px; /* Altura confortável para clique */

  svg {
    flex-shrink: 0;
  }

  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.02);
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.placeholder};
  }

  /* SUPORTE PARA TELAS PEQUENAS (MOBILE EXTREMO) */
  @media (max-width: 400px) {
    padding: 0.5rem;
    
    /* Esconde o texto "Anterior" e "Próximo" em telas minúsculas para não quebrar a linha */
    span {
      display: none; 
    }
  }
`;
