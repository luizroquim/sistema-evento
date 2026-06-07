import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column; /* Por padrão (no mobile), os filtros ficam um embaixo do outro */
  gap: 0.75rem; /* Espaçamento confortável para o toque no celular */
  width: 100%;
  box-sizing: border-box;

  /* A partir de tablets e telas médias, eles se alinham lado a lado */
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

export const InputWrapper = styled.div`
  width: 100%; /* No mobile, ocupa a largura total da tela */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  padding: 0 1rem;
  height: 44px; /* Aumentado para 44px (Boa prática de acessibilidade/W3C para cliques no mobile) */
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  /* Evita que o wrapper tente encolher além do esperado */
  min-width: 0; 

  svg {
    color: ${({ theme }) => theme.colors.placeholder};
    flex-shrink: 0;
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.colors.shadowFocus};
  }

  /* No desktop, ele volta a ser o elemento principal que estica e ocupa o espaço restante */
  @media (min-width: 768px) {
    flex: 1;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

export const Select = styled.select`
  width: 100%; /* No mobile, os selects também ganham largura total para melhor usabilidade */
  height: 44px; /* Mesma altura de 44px do input para manter o nivelamento perfeito */
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  
  /* Remove a aparência nativa do select no mobile para aplicar o nosso estilo perfeitamente */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  
  /* Adiciona uma setinha customizada sutil à direita (boa prática de design funcional) */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238a8b73' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 16px;
  padding-right: 2.5rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: ${({ theme }) => theme.colors.shadowFocus};
  }

  /* No desktop, eles deixam de ser 100% e voltam a ter um tamanho fixo elegante */
  @media (min-width: 768px) {
    width: auto;
    min-width: 180px;
  }
`;