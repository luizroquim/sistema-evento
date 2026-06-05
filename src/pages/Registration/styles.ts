import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 550px;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.card};
  padding: 2.5rem;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.03);

  /* Garante que nenhum elemento filho saia para fora do limite do card */
  * {
    box-sizing: border-box;
  }
`;
export const HeaderGroup = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const FormTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: 0.5rem;
`;

export const FormSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.placeholder};
  line-height: 1.5;
`;

export const RowGroup = styled.div`
  display: grid;
  /* Força a criação de 2 colunas com o tamanho exato de 1 fração cada */
  grid-template-columns: 1fr 1fr;
  /* Adiciona um espaçamento horizontal agressivo e obrigatório entre as colunas */
  column-gap: 1.5rem !important;
  width: 100%;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    row-gap: 1.25rem;
  }
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
  max-width: 400px;
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
  max-width: 400px;
`;

export const ErrorAlert = styled.div`
  color: ${(props) => props.theme.colors.error};
  padding: 1rem;
  /* Usando a opacidade em cima da cor de erro do seu tema para o fundo */
  background-color: ${(props) => `${props.theme.colors.error}10`};
  border-radius: ${(props) => props.theme.borderRadius.input};
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.colors.error};
  font-size: 0.9rem;
`;

export const LoadingFeedback = styled.p`
  font-size: 0.8rem;
  /* Corrigido: usando foreground (Verde escuro floresta) que é a cor de texto padrão do seu tema */
  color: ${(props) => props.theme.colors.foreground};
  margin-top: 0.5rem;
  text-align: center;
  opacity: 0.8; /* Uma leve opacidade para dar o tom de feedback secundário */
`;
