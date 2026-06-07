import styled from 'styled-components';

export const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  box-sizing: border-box;

  @media (min-width: 769px) {
    padding: 2.5rem 2rem;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.borderFocus};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProtocolBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.placeholder};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.foreground};
  margin-top: 0.2rem;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const Card = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  padding-bottom: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.placeholder};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const TextValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.5;
`;

export const FileLinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

export const CriterionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.01);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
`;

export const CriterionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const CriterionName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const CriterionDesc = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.placeholder};
  line-height: 1.4;
`;

export const ScoreInput = styled.input`
  width: 100px;
  height: 44px;
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
  }

  &::placeholder {
    color: #a1a1aa;
    font-weight: 400;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: inherit;
  resize: vertical;
  line-height: 1.5;

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
  }
`;

export const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
`;

export const FinalScoreBox = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  background-color: ${({ theme, $active }) => $active ? theme.colors.successLight : 'rgba(0, 0, 0, 0.02)'};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.success : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  transition: all 0.3s ease;

  .label {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme, $active }) => $active ? theme.colors.foreground : theme.colors.placeholder};
    text-transform: uppercase;
  }

  .value {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme, $active }) => $active ? theme.colors.foreground : theme.colors.placeholder};
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (min-width: 1024px) {
    /* 1fr para dados do candidato, 1.2fr para o formulário de notas */
    grid-template-columns: 1fr 1.2fr; 
  }
`;