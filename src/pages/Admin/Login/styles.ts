import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 450px;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.card};
  padding: 2.5rem;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.03);

  * {
    box-sizing: border-box;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.placeholder};
  line-height: 1.5;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.875rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  border: 1px solid ${({ theme, $hasError }) => 
    $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) => 
      $hasError ? theme.colors.error : theme.colors.borderFocus};
  }

  &::selection {
    background: ${({ theme }) => theme.colors.selectionBg};
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 500;
`;

export const SubmitButton = styled.button`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.foreground};
  color: ${({ theme }) => theme.colors.surface};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.input};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.borderFocus};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ForgotPasswordLink = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  margin-top: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.borderFocus};
    text-decoration: underline;
  }
`;