export const theme = {
  colors: {
    // --- SUAS VARIÁVEIS ORIGINAIS (Agora com os códigos HEX exatos do site) ---
    background: "#f7f5ec",
    foreground: "#16351f",
    surface: "#ffffff", 
    border: "#c9c29e", 
    borderFocus: "#0b4a24", 
    shadowFocus: "rgba(246, 198, 91, 0.35)", 
    selectionBg: "#f6c65b",
    placeholder: "#5d6148", 
    error: "#ef4444", 
    success: "#22c55e", 

    // --- NOVOS TOKENS DO SITE ---
    primary: "#0b4a24",
    primaryDark: "#063719",
    primaryText: "#294b2f",
    secondaryText: "#566247",
    mutedText: "#5d6148",
    accent: "#d86f19",
    accentYellow: "#f6c65b",
    surfaceMuted: "#eef3e6",
    surfaceSoft: "#e9efe1",
    borderSoft: "#e4dec7",
    white: "#ffffff",

    // --- TOKENS DE INTERAÇÃO E STATUS ---
    hover: "rgba(0, 0, 0, 0.03)",
    danger: "#dc2626",
    dangerHover: "rgba(220, 38, 38, 0.05)",
    successLight: "rgba(22, 53, 31, 0.04)",

    status: {
      pending: { bg: "#fef3c7", text: "#78350f" },
      revision: { bg: "#f3e8ff", text: "#6b21a8" },
      conflito: { bg: "#d1d5db", text: "#374151" },
      success: { bg: "#f0fdf4", text: "#166534" },
    },

    action: {
      primary: "#16351f", 
      secondary: "#6b7280",
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