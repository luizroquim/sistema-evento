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
  color: ${({ theme }) => theme.colors.placeholder};
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

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
`;

export const SuccessTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

export const SuccessSubtitle = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.placeholder};
  margin-bottom: 1.5rem;
  
  span {
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 600;
  }
`;

export const ProtocolBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  padding: 1.25rem;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const ProtocolLabel = styled.span`
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.placeholder};
  margin-bottom: 0.25rem;
`;

export const ProtocolValue = styled.strong`
  font-size: 1.5rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;