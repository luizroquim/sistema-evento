import styled, { css } from "styled-components";
import { ButtonVariant } from "./index";

// 1. O TypeScript agora sabe que $fullWidth existe e é um booleano
interface StyledButtonProps {
  $variant?: ButtonVariant;
  $fullWidth?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;

  /* 2. Aplica 100% de largura se a prop for verdadeira, ou mantém automático */
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* O espaçamento entre o ícone e o texto */

  border-radius: ${({ theme }) => theme.borderRadius.button};
  padding: 0 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;

  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;

  border: 1px solid transparent;
  cursor: pointer;
  outline: none;

  /* Centralização perfeita para o container do ícone */
  .button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    stroke-width: 2.5px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $variant, theme }) => {
    switch ($variant) {
      case "secondary":
        return css`
          border: 1px solid ${theme.colors.border};
          background: ${theme.colors.surface};
          color: ${theme.colors.foreground};
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

          &:hover:not(:disabled) {
            border: 1px solid ${theme.colors.primary};

            color: ${theme.colors.primary};
            transform: scale(1.03);

            transition:
              background-color 0.2s ease-in-out,
              border-color 0.2s ease-in-out,
              color 0.2s ease-in-out,
              transform 0.2s ease-in-out;
          }

          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;

      case "ghost":
        return css`
          background: transparent;
          color: ${theme.colors.foreground};

          &:hover:not(:disabled) {
            background: ${theme.colors.hover};
            color: ${theme.colors.primary};
          }
        `;

      case "primary":
      default:
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

          &:hover:not(:disabled) {
            background: ${theme.colors.primaryDark};
            transform: scale(1.03);

            transition:
              background-color 0.2s ease-in-out,
              border-color 0.2s ease-in-out,
              color 0.2s ease-in-out,
              transform 0.2s ease-in-out;
            
              &:active:not(:disabled) {
              transform: scale(0.98);
            }
          }
        `;
    }
  }}
`;
