import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 1rem;
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

export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
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

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1.2fr;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  padding-bottom: 0.75rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.75rem;
  column-gap: 1rem;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const Label = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const Value = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.3;
`;

/* ESTILOS ESPECÍFICOS DESTA TELA */

export const AlertBox = styled.div`
  background-color: #fffbeb;
  border: 1px solid #f59e0b;
  color: #b45309;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const ReturnButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.status.revision.text};
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const ReviewCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const AverageBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0.5rem 0 1rem 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
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
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;
