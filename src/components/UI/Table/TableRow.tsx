import React from 'react';
import { 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  ShieldAlert, 
  ClipboardCheck, 
  RotateCcw, 
  Eye, 
  Pencil, 
  Scale 
} from 'lucide-react';
import { Button } from '../Button';
import * as S from './styles';

interface TableRowProps {
  data: any;
  onAction: (id: string) => void;
  onView?: (id: string) => void;
}

export const TableRow = React.memo(({ data, onAction, onView }: TableRowProps) => {
  const isPendente = data.myVoteStatus === 'pendente';
  const isRevisao = data.myVoteStatus === 'revisao';
  const isAvaliado = data.myVoteStatus === 'avaliado';
  const isConflito = data.myVoteStatus === 'conflito';

  const isAdmin = data.projectTitle && data.projectTitle.includes('Média');

  return (
    <tr>
      <S.Td><strong>{data.protocol}</strong></S.Td>
      <S.Td>
        <S.CandidateContainer>
          <S.CandidateName>{data.name}</S.CandidateName>
          <S.ProjectTitle>{data.projectTitle}</S.ProjectTitle>
        </S.CandidateContainer>
      </S.Td>
      <S.Td>{data.date}</S.Td>
      
      <S.TdStatus>
        <S.StatusBadge $status={data.myVoteStatus}>
          {isPendente && <><Clock size={14} /> {isAdmin ? 'EM ABERTO' : 'AGUARDANDO NOTA'}</>}
          {isRevisao && <><RefreshCw size={14} /> REVISÃO SOLICITADA</>}
          {isAvaliado && <><CheckCircle2 size={14} /> {isAdmin ? 'CONCLUÍDO' : 'PARECER ENVIADO'}</>}
          {isConflito && <><ShieldAlert size={14} /> CONFLITO NA BANCA</>}
        </S.StatusBadge>
      </S.TdStatus>
      
      <S.TdAction>
        <S.ActionGroup>
          <Button variant={isAvaliado ? "secondary" : "primary"} onClick={() => onAction(data.id)}>
            {isPendente && (
              <>
                <span>Avaliar agora</span>
                <ClipboardCheck size={16} />
              </>
            )}
            
            {isRevisao && (
              <>
                <span>Corrigir avaliação</span>
                <RotateCcw size={16} />
              </>
            )}
            
            {isAvaliado && (
              <>
                {isAdmin ? (
                  <>
                    <span>Ver Detalhes</span>
                    <Eye size={16} />
                  </>
                ) : (
                  <>
                    <span>Editar avaliação</span>
                    <Pencil size={16} />
                  </>
                )}
              </>
            )}
            
            {isConflito && (
              <>
                <span>Resolver Conflito</span>
                <Scale size={16} />
              </>
            )}
          </Button>

          {onView && (
            <Button variant="ghost" onClick={() => onView(data.id)}>
              <span>Ver avaliação</span>
              <Eye size={16} />
            </Button>
          )}
        </S.ActionGroup>
      </S.TdAction>
    </tr>
  );
});

TableRow.displayName = 'TableRow';