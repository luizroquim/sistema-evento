import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const UploadArea = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  background-color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.borderFocus};
    
    /* Faz o ícone dar um leve "pulo" no hover para melhorar o UX */
    svg {
      transform: translateY(-2px);
    }
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.shadowFocus};
  }

  input {
    display: none;
  }

  svg {
    transition: transform 0.2s ease-in-out;
    margin-bottom: 0.5rem;
  }
`;

export const Text = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.placeholder};
  text-align: center;
  
  strong {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

// 🔥 NOVO COMPONENTE: Nome do arquivo estilizado com a cor de sucesso do seu tema
export const FileNameSuccess = styled.strong`
  color: ${({ theme }) => theme.colors.success};
  word-break: break-all;
`;

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0.25rem;
  font-weight: 500;
`;


export const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 0.725rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-top: 0.5rem;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;

  &:hover {
    
    color: ${({ theme }) => theme.colors.error};
  }
`;