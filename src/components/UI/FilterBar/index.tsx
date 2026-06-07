import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import * as S from "./styles";

interface FilterBarProps {
  onSearch: (value: string) => void;
  onFilterStatus: (status: string) => void;
  onSort: (sort: string) => void;
  isAdmin?: boolean;
}

export const FilterBar = React.memo(
  ({ onSearch, onFilterStatus, onSort, isAdmin = false }: FilterBarProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        onSearch(searchTerm);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, onSearch]);

    return (
      <S.Container>
        <S.InputWrapper>
          <Search size={18} />
          <S.StyledInput
            type="text"
            placeholder="Buscar por candidato, protocolo ou título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.InputWrapper>

        <S.Select onChange={(e) => onFilterStatus(e.target.value)}>
          <option value="todos">Todos os status</option>
          <option value="pendente">Aguardando nota</option>
          <option value="revisao">Revisão solicitada</option>
          <option value="avaliado">Parecer enviado</option>
        </S.Select>

        <S.Select onChange={(e) => onSort(e.target.value)}>
          <option value="az">Candidato (A-Z)</option>
          {isAdmin && (
            <>
              <option value="nota-desc">Nota (maior primeiro)</option>
              <option value="nota-asc">Nota (menor primeiro)</option>
            </>
          )}
          <option value="recentes">Mais recentes</option>
          <option value="antigos">Mais antigos</option>
        </S.Select>
      </S.Container>
    );
  },
);

FilterBar.displayName = "FilterBar";