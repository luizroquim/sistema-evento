// src/styles/globalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* 1. Reset Semântico Completo (Normas MDN) */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 2. Configurações Globais do Corpo da Página */
  body {
    font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.foreground};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* 3. Estilização da Seleção de Texto (Identidade Visual da LP) */
  ::selection {
    background-color: ${props => props.theme.colors.selectionBg};
    color: ${props => props.theme.colors.foreground};
  }

  /* 4. Padronização de Elementos Interativos */
  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    transition: all 0.2s ease-in-out;
  }

  input, textarea, select {
    font-family: inherit;
  }

  *:focus-visible {
    outline: 3px solid ${props => props.theme.colors.borderFocus};
    outline-offset: 2px;
  }
`; // <-- Chaves fechadas corretamente aqui!