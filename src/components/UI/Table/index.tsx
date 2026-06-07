import * as S from "./styles";
import { TableRow } from "./TableRow";

interface TableProps {
  columns: string[];
  data: any[];
  onAction: (id: string) => void; // Ação primária (ex: avaliar/editar)
  onView?: (id: string) => void; // Ação secundária: ver avaliação
}

export const Table = ({ columns, data, onAction, onView }: TableProps) => {
  return (
    <S.TableContainer>
      <S.Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <S.Th key={col}>{col}</S.Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              data={item}
              onAction={onAction} // Passando a ação primária
              onView={onView}
            />
          ))}
        </tbody>
      </S.Table>
    </S.TableContainer>
  );
};
