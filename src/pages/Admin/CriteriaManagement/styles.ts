// src/pages/Admin/CriteriaManagement/styles.ts
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
  max-width: 1100px;
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

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1.5fr;
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
  height: fit-content;
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  padding-bottom: 0.75rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  height: 44px;
  background-color: ${({ theme }) => theme.colors.borderFocus};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const CriteriaListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CriterionCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

export const CriterionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    color: ${({ theme }) => theme.colors.foreground};
    font-size: 0.95rem;
  }

  p {
    color: #4b5563;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  span {
    font-size: 0.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.placeholder};
    text-transform: uppercase;
    margin-top: 0.25rem;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const IconButton = styled.button<{ $variant?: "edit" | "delete" }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $variant, theme }) => 
    $variant === "delete" ? theme.colors.error : theme.colors.placeholder};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ $variant, theme }) => 
      $variant === "delete" ? theme.colors.error : theme.colors.foreground};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: 0.875rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
`;