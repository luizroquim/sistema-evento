import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as S from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// React.memo garante que a paginação só re-renderize se o número da página mudar
export const Pagination = React.memo(({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <S.Container>
      <S.PaginationWrapper>
        <S.Button 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </S.Button>
        
        <S.PageInfo>
          {currentPage} / {totalPages}
        </S.PageInfo>

        <S.Button 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Próxima página"
        >
          <span>Próximo</span>
          <ChevronRight size={16} />
        </S.Button>
      </S.PaginationWrapper>
    </S.Container>
  );
});

Pagination.displayName = 'Pagination';