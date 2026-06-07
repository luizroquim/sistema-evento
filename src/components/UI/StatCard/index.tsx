import React from "react";
import * as S from "./styles";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  status: "total" | "pending" | "success" | "revision" | "conflict"; // Define o padrão visual do card
}

// React.memo para performance: impede re-renders se os dados numéricos não mudarem
export const StatCard = React.memo(
  ({ label, value, icon, status }: StatCardProps) => {
    return (
      <S.Container>
        <S.Header>
          {label}
          <S.IconWrapper $status={status}>{icon}</S.IconWrapper>
        </S.Header>
        <S.Value>{value}</S.Value>
      </S.Container>
    );
  },
);

StatCard.displayName = "StatCard";
