import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 1rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 2.5rem 2rem;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

export const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  p {
    white-space: normal;
    word-break: break-word;
    max-width: 600px;
  }
`;

export const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.placeholder};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.placeholder};
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;

    button,
    a {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: #ffffff;
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 0.5rem;

  & > * {
    min-width: 0;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
  }
`;

export const StatCard = styled.div<{ $type?: "warning" }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid
    ${({ theme, $type }) =>
      $type === "warning" ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme, $type }) =>
      $type === "warning" ? theme.colors.error : theme.colors.placeholder};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    text-transform: uppercase;
  }

  strong {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
    color: ${({ theme, $type }) =>
      $type === "warning" ? theme.colors.error : theme.colors.foreground};
  }
`;
