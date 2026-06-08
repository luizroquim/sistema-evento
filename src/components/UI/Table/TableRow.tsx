import React, { useMemo } from 'react';
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
  const isAdmin = data.isAdmin === true;

  // 1. Isolamos a lógica para descobrir qual botão o jurado deve ver.
  // Isso limpa totalmente a poluição visual dentro do JSX lá embaixo!
  const juryActionConfig = useMemo(() => {
    if (isPendente) return { text: 'Avaliar agora', icon: <ClipboardCheck size={16} />, variant: 'secondary' as const };
    if (isRevisao) return { text: 'Corrigir avaliação', icon: <RotateCcw size={16} />, variant: 'secondary' as const };
    if (isAvaliado) return { text: 'Editar avaliação', icon: <Pencil size={16} />, variant: 'secondary' as const };
    if (isConflito) return { text: 'Resolver Conflito', icon: <Scale size={16} />, variant: 'secondary' as const };
    return null;
  }, [isPendente, isRevisao, isAvaliado, isConflito]);

  return (
    <tr>
      <S.Td><strong>{data.protocol}</strong></S.Td>
      
      <S.Td>
        <S.CandidateContainer>
          <S.CandidateName>{data.name}</S.CandidateName>
          {data.projectTitle && <S.ProjectTitle>{data.projectTitle}</S.ProjectTitle>}
        </S.CandidateContainer>
      </S.Td>
      
      <S.Td>{data.date || '--'}</S.Td>
      
      {isAdmin && (
        <S.TdCenter><strong>{data.averageGrade}</strong></S.TdCenter>
      )}

      <S.TdCenter>
        <S.StatusBadge $status={data.myVoteStatus}>
          {isPendente && <><Clock size={14} /> {isAdmin ? 'EM ABERTO' : 'AGUARDANDO NOTA'}</>}
          {isRevisao && <><RefreshCw size={14} /> {isAdmin ? 'EM REVISÃO' : 'REVISÃO SOLICITADA'}</>}
          {isAvaliado && <><CheckCircle2 size={14} /> {isAdmin ? 'CONCLUÍDO' : 'PARECER ENVIADO'}</>}
          {isConflito && <><ShieldAlert size={14} /> CONFLITO NA BANCA</>}
        </S.StatusBadge>
      </S.TdCenter>
      
      <S.TdAction>
        <S.ActionGroup>
          {isAdmin ? (
            // Botão do Admin usando as novas props
            <Button 
              variant="secondary" 
              icon={<Eye size={16} />} 
              fullWidth 
              onClick={() => onAction(data.id)}
            >
              Ver Detalhes
            </Button>
          ) : (
            <>
              {/* Botão dinâmico do Jurado (Super limpo!) */}
              {juryActionConfig && (
                <Button 
                  variant={juryActionConfig.variant} 
                  icon={juryActionConfig.icon} 
                  fullWidth 
                  onClick={() => onAction(data.id)}
                >
                  {juryActionConfig.text}
                </Button>
              )}

              {/* Botão extra de visualização */}
              {onView && (
                <Button 
                  variant="ghost" 
                  icon={<Eye size={16} />} 
                  fullWidth 
                  onClick={() => onView(data.id)}
                >
                  Ver avaliação
                </Button>
              )}
            </>
          )}
        </S.ActionGroup>
      </S.TdAction>
    </tr>
  );
});

TableRow.displayName = 'TableRow';