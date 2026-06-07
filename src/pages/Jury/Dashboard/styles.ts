import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 1rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 2.5rem 2rem;
  }
`;

export const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Cria o espaçamento vertical perfeito entre Header, Cards, Filtro e Tabela */
  width: 100%;
  box-sizing: border-box;
`;

// Encontre e substitua esses dois componentes no seu src/pages/Jury/Dashboard/styles.ts

export const Header = styled.header`
  display: flex;
  flex-direction: column; /* No celular, o botão de sair vai para baixo do título para não amassar */
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem; /* Dá um espaço confortável entre o bloco de texto e o botão */
  width: 100%;

  /* A partir do tablet/computador, eles voltam a ficar lado a lado */
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center; /* Alinha o botão verticalmente com o centro do título */
    gap: 1rem;
  }
`;

export const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* Garante que as descrições longas quebrem linha suavemente no celular */
  p {
    white-space: normal;
    word-break: break-word;
    max-width: 600px; /* Limita a largura do texto no desktop para ficar mais elegante */
  }
`;

export const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.placeholder};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.foreground};
  margin-top: 0.25rem;
  margin-bottom: 0;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.placeholder};
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  /* NO CELULAR: Força 2 colunas idênticas lado a lado (Matriz 2x2) */
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem; /* Um gap ligeiramente menor no mobile para dar mais espaço aos textos */
  width: 100%;
  box-sizing: border-box;

  /* A partir de computadores/telas grandes (1024px), volta a ficar tudo em 1 linha só */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem; /* Retorna o espaçamento original no desktop */
  }
`;




