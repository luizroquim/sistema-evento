export const theme = {
  colors: {
    background: "#f7f5ec",
    foreground: "#16351f",
    surface: "#ffffff",
    border: "#c9c29e",
    borderFocus: "#0b4a24",
    shadowFocus: "rgba(246, 198, 91, 0.35)",
    selectionBg: "#f6c65b",
    placeholder: "#8a8b73",
    error: "#ef4444",
    success: "#22c55e",

    /* --- NOVOS TOKENS DE INTERAÇÃO (Adicionados aqui!) --- */
    hover: "rgba(0, 0, 0, 0.03)",
    danger: "#dc2626",
    dangerHover: "rgba(220, 38, 38, 0.05)",
    successLight: "rgba(22, 53, 31, 0.04)",

    // Cores de status no padrão light/pastel do print
    status: {
      pending: {
        bg: "#fef3c7", // Amarelo/Laranja bem claro
        text: "#78350f", // Marrom escuro para o texto/ícone
      },
      revision: {
        bg: "#f3e8ff", // Roxo bem claro
        text: "#6b21a8", // Roxo escuro para o texto/ícone
      },
      conflito: {
        bg: "#d1d5db", // Cinza rochoso suave
        text: "#374151", // Cinza escuro neutro
      },
      success: {
        bg: "#f0fdf4", // Verde bem claro
        text: "#166534", // Verde escuro para o texto/ícone
      },
    },

    action: {
      primary: "#16351f",
      secondary: "#6b7280", // Cinza médio para as bordas dos botões neutros
      ghost: "#ef4444",
    },
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.85rem",
    base: "1rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
    "2xl": "2.5rem",
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  borderRadius: {
    input: "0.375rem",
    card: "0.75rem",
    button: "0.5rem",
  },
} as const;

export type ThemeType = typeof theme;
