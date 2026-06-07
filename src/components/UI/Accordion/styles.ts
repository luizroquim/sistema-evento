// src/components/UI/Accordion/styles.ts
import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }
`;

export const Header = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 1rem;
  cursor: pointer;
  text-align: left;
  color: ${({ theme }) => theme.colors.foreground};
  
  &:focus {
    outline: none;
  }
`;

export const Content = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  padding: 0 1rem 1rem 1rem;
  border-top: ${({ $isOpen, theme }) => 
    $isOpen ? `1px solid ${theme.colors.border}` : "none"};
  padding-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
`;