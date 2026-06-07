import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 769px) {
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.card};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  @media (max-width: 768px) {
    display: block;
    width: 100%;

    thead {
      display: none;
    }

    tbody {
      display: block;
      width: 100%;
    }

    tbody tr {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      padding: 1.25rem;
      margin-bottom: 1rem;
      background-color: ${({ theme }) => theme.colors.surface};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.borderRadius.card};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
      transition: background-color 0.15s ease-in-out;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  @media (min-width: 769px) {
    tbody tr {
      transition: background-color 0.15s ease-in-out;
      &:hover {
        background-color: ${({ theme }) => theme.colors.successLight};
      }
    }
  }
`;

export const Th = styled.th`
  padding: 1rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.015);
  color: ${({ theme }) => theme.colors.placeholder};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 769px) {
    /* Centraliza Média Final, Status e Ações automaticamente */
    &:nth-child(n+4) {
      text-align: center;
    }
  }
`;

export const Td = styled.td`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  vertical-align: middle;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 0;
    border-bottom: none;
    width: 100%;
  }
`;

export const TdStatus = styled(Td)`
  @media (min-width: 769px) {
    text-align: center;
  }
`;

export const ThAction = styled(Th)`
  @media (min-width: 769px) {
    text-align: center;
    width: 1%; 
    white-space: nowrap;
  }
`;

export const TdAction = styled(Td)`
  @media (min-width: 769px) {
    text-align: center;
    width: 1%; 
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    padding-top: 0.85rem;
    border-top: 1px dashed ${({ theme }) => theme.colors.border};
    justify-content: center;

    button {
      width: 100% !important;
      height: 44px;
    }
  }
`;

export const CandidateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
`;

export const CandidateName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const ProjectTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.placeholder};
  white-space: normal;

  @media (min-width: 769px) {
    max-width: 320px;
  }
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 11px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;

  svg {
    flex-shrink: 0;
  }

  background-color: ${({ theme, $status }) => {
    if ($status === "pendente") return theme.colors.status.pending.bg;
    if ($status === "revisao") return theme.colors.status.revision.bg;
    if ($status === "conflito") return theme.colors.status.conflito.bg;
    return theme.colors.status.success.bg;
  }};

  color: ${({ theme, $status }) => {
    if ($status === "pendente") return theme.colors.status.pending.text;
    if ($status === "revisao") return theme.colors.status.revision.text;
    if ($status === "conflito") return theme.colors.status.conflito.text;
    return theme.colors.status.success.text;
  }};

  @media (max-width: 768px) {
    width: auto;
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const TdCenter = styled(Td)`
  @media (min-width: 769px) {
    text-align: center;
  }
`;