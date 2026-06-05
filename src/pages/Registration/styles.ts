import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
`;

export const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 450px;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.card};
  padding: 2.5rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.02);
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.foreground};
  font-family: sans-serif;
  text-align: center;
  margin-bottom: 0.25rem;
`;

export const FormSubtitle = styled.p`
  font-size: 0.875rem;
  color: #666;
  text-align: center;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

export const ModalText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.foreground};
  
  strong {
    font-weight: 700;
  }
`;

export const ModalSubText = styled.p`
  font-size: 0.925rem;
  line-height: 1.5;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.placeholder};
`;