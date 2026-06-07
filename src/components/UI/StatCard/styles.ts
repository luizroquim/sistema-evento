import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) =>
    theme.borderRadius.card}; /* 12px do seu tema */
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  /* TRAVAS DE SEGURANÇA PARA RESPONSIVIDADE */
  width: 100%; /* Obriga o card a ocupar APENAS o espaço que a coluna do Grid der para ele */
  min-width: 0; /* Crucial! Diz ao navegador que o card PODE encolher se a tela diminuir */
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  width: 100%;

  /* Se o texto do label for muito grande em telas pequenas, ele quebra linha em vez de estourar o card */
  span {
    white-space: normal;
    word-break: break-word;
  }
`;

interface IconWrapperProps {
  $status: "total" | "pending" | "success" | "revision" | "conflict";
}

export const IconWrapper = styled.div<IconWrapperProps>`
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Impede o círculo do ícone de ser esmagado */

  background-color: ${({ theme, $status }) => {
    if ($status === "total") return "rgba(0, 0, 0, 0.03)";
    if ($status === "pending") return theme.colors.status.pending.bg;
    if ($status === "revision") return theme.colors.status.revision.bg;
    if ($status === "conflict") return theme.colors.status.conflito.bg;
    return theme.colors.status.success.bg;
  }};

  color: ${({ theme, $status }) => {
    if ($status === "total") return theme.colors.foreground;
    if ($status === "pending") return theme.colors.status.pending.text;
    if ($status === "revision") return theme.colors.status.revision.text;
    if ($status === "conflict") return theme.colors.status.conflito.text;
    return theme.colors.status.success.text;
  }};

  svg {
    flex-shrink: 0;
  }
`;

export const Value = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl}; /* 24px */
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1;
  margin-top: 0.25rem;
`;
