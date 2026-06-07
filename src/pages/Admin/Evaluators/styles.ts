import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.25rem;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.borderFocus};
    color: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

/* Formulário de adição em linha horizontal */
export const AddFormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr auto;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const Input = styled.input`
  padding: 0.6rem 0.75rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: 0.9rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

export const SubmitButtonContainer = styled.div`
  margin-top: 1.2rem;
  height: 38px;
  display: flex;
  
  button {
    height: 100%;
    white-space: nowrap;
  }

  @media (max-width: 850px) {
    margin-top: 0;
    width: 100%;
    
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

/* TABELA ADAPTADA COM AS REGRAS RESPONSIVAS DO JURY */
export const TableContainer = styled.div`
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 769px) {
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.card};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  @media (max-width: 768px) {
    display: block;
    width: 100%;

    thead {
      display: none;
    }

    tbody {
      display: block;
      width: 100%;
    }

    tbody tr {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      padding: 1.25rem;
      margin-bottom: 1rem;
      
      background-color: ${({ theme }) => theme.colors.surface};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.borderRadius.card};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (min-width: 769px) {
    tbody tr {
      transition: background-color 0.15s ease-in-out;
      &:hover {
        background-color: ${({ theme }) => theme.colors.successLight};
      }
    }
  }
`;

export const Th = styled.th`
  padding: 1rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.015);
  color: ${({ theme }) => theme.colors.placeholder};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Td = styled.td`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  vertical-align: middle;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 0;
    border-bottom: none;
    width: 100%;
  }
`;

/* ALINHAMENTO DAS COLUNAS DE AÇÃO BASEADO NO SEU ESTILO ORIGINAL */
export const ThAction = styled(Th)`
  @media (min-width: 769px) {
    text-align: right;
  }
`;

export const TdAction = styled(Td)`
  @media (min-width: 769px) {
    text-align: right;
  }

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    padding-top: 0.85rem;
    border-top: 1px dashed ${({ theme }) => theme.colors.border}; 
    justify-content: center;
    
    button {
      width: 100% !important;
      height: 44px;
    }
  }

  /* FORÇANDO O BOTÃO DE REMOVER COM CORES DO TEMA */
  button {
    background-color: ${({ theme }) => theme.colors.error};
    color: #ffffff;
    border: none;
    transition: background-color 0.15s ease-in-out;

    svg {
      color: #ffffff !important;
      stroke: #ffffff !important;
    }

    span {
      color: #ffffff !important;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.danger || '#dc2626'};
    }
  }
`;

export const EmptyTd = styled(Td)`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.placeholder};
`;