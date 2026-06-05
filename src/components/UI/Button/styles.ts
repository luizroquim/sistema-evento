import styled, { css } from "styled-components";
import { ButtonVariant } from "./index";

interface StyledButtonProps {
  $variant: ButtonVariant;
}

const variantStyles = {
  primary: css`
    background-color: ${(props) => props.theme.colors.foreground};
    color: ${(props) => props.theme.colors.surface};
    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.borderFocus};
    }
  `,

  secondary: css`
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.foreground};
    border: 1px solid ${(props) => props.theme.colors.border};

    &:hover:not(:disabled) {
      border-color: ${(props) => props.theme.colors.borderFocus};
      background-color: ${(props) => props.theme.colors.background};
    }
  `,

  ghost: css`
    background-color: transparent;
    color: ${(props) => props.theme.colors.foreground};

    &:hover:not(:disabled) {
      background-color: rgba(22, 53, 31, 0.08);
    }
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;
  min-height: 2.75rem;
  padding: 0 1.25rem;

  font-size: 0.875rem;
  font-weight: 600;
  border-radius: ${(props) => props.theme.borderRadius.input};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 150ms ease;

  
  ${(props) => variantStyles[props.$variant]}

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.borderFocus};
    outline-offset: 2px;
  }


  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    background-color: ${(props) => props.theme.colors.placeholder};
    color: ${(props) => props.theme.colors.surface};
    border-color: transparent;
  }
`;
