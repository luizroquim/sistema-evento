export const theme = {
  colors: {
    
    background: '#f7f5ec',      // Bege claro (--background)
    foreground: '#16351f',      // Verde escuro floresta (--foreground)
    surface: '#ffffff',         // Branco para o fundo do card do formulário
    border: '#c9c29e',          // Cor da borda padrão do input
    borderFocus: '#0b4a24',     // Verde escuro ao focar no input
    shadowFocus: 'rgba(246, 198, 91, 0.35)', // Sombra dourada de foco
    selectionBg: '#f6c65b',     // Amarelo/Dourado para texto selecionado
    placeholder: '#8a8b73',     // Cinza esverdeado para o placeholder
    
    // Cores utilitárias padrão de mercado para validação
    error: '#ef4444',
    success: '#22c55e'
  },
  borderRadius: {
    input: '0.375rem',          // 6px (.field-control)
    card: '0.75rem'             // 12px para o container do form
  }
} as const;

export type ThemeType = typeof theme;