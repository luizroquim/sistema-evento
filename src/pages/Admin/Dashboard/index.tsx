import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  FileText,
  Clock,
  CheckCircle2,
  RefreshCw,
  Users,
} from "lucide-react";
import { Button } from "../../../components/UI/Button";
import { StatCard } from "../../../components/UI/StatCard";
import { FilterBar } from "../../../components/UI/FilterBar";
import { Pagination } from "../../../components/UI/Pagination";
import { Table } from "../../../components/UI/Table";
import * as S from "./styles";

interface Candidate {
  id: string;
  name: string;
  protocol: string;
  projectTitle: string;
  submissionDate: string;
  status: "pendente" | "avaliado" | "revisao" | "conflito";
  averageGrade: number | null;
}

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "Ana Carolina Silva",
    protocol: "REQ-001",
    projectTitle: "A memória das cidades pequenas",
    submissionDate: "28 mai 2026",
    status: "pendente",
    averageGrade: null,
  },
  {
    id: "2",
    name: "Marcos Vinicius Costa",
    protocol: "REQ-002",
    projectTitle: "Impacto das APIs em Sistemas Legados",
    submissionDate: "29 mai 2026",
    status: "avaliado",
    averageGrade: 8.75,
  },
  {
    id: "3",
    name: "Beatriz Souza",
    protocol: "REQ-003",
    projectTitle: "Versos sobre o silêncio",
    submissionDate: "30 mai 2026",
    status: "revisao",
    averageGrade: 6.5,
  },
  {
    id: "4",
    name: "Helena Martins",
    protocol: "REQ-004",
    projectTitle: "Modernização de Interfaces em React",
    submissionDate: "01 jun 2026",
    status: "revisao",
    averageGrade: 7.0,
  },
  {
    id: "5",
    name: "Lucas Pereira",
    protocol: "REQ-005",
    projectTitle: "Otimização de Bancos de Dados no Varejo",
    submissionDate: "02 jun 2026",
    status: "avaliado",
    averageGrade: 9.2,
  },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const [candidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth >= 768 ? 10 : 5,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [sortOrder, setSortOrder] = useState("nota-desc");

  const handleLogout = useCallback(() => navigate("/admin"), [navigate]);
  const handleGoToEvaluators = useCallback(
    () => navigate("/admin/avaliadores"),
    [navigate],
  );
  const handleAction = useCallback(
    (id: string) => navigate(`/admin/avaliar/${id}`),
    [navigate],
  );

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleFilterStatus = useCallback((status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((sort: string) => {
    setSortOrder(sort);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    function handleResize() {
      setItemsPerPage(window.innerWidth >= 768 ? 10 : 5);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredAndSortedData = useMemo(() => {
    let result = [...candidates];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(query) ||
          candidate.protocol.toLowerCase().includes(query),
      );
    }

    if (statusFilter !== "todos") {
      result = result.filter((candidate) => candidate.status === statusFilter);
    }

    if (sortOrder === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "nota-desc") {
      result.sort((a, b) => {
        const aGrade = a.averageGrade ?? -Infinity;
        const bGrade = b.averageGrade ?? -Infinity;
        return bGrade - aGrade;
      });
    } else if (sortOrder === "nota-asc") {
      result.sort((a, b) => {
        const aGrade = a.averageGrade ?? Infinity;
        const bGrade = b.averageGrade ?? Infinity;
        return aGrade - bGrade;
      });
    } else if (sortOrder === "recentes") {
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortOrder === "antigos") {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [candidates, searchQuery, statusFilter, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(start, start + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const mappedData = paginatedData.map((candidate) => ({
    id: candidate.id,
    protocol: candidate.protocol,
    name: candidate.name,
    projectTitle: candidate.projectTitle,
    date: candidate.submissionDate,
    averageGrade: candidate.averageGrade !== null ? candidate.averageGrade.toFixed(2) : "--",
    myVoteStatus: candidate.status,
    isAdmin: true,
  }));

  const totalTrabalhos = candidates.length;
  const totalPendentes = candidates.filter(
    (c) => c.status === "pendente",
  ).length;
  const totalConcluidos = candidates.filter(
    (c) => c.status === "avaliado",
  ).length;
  const totalRevisoes = candidates.filter((c) => c.status === "revisao").length;

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.HeaderTitles>
            <S.Subtitle>Painel Administrativo</S.Subtitle>
            <S.Title>Painel Geral de Trabalhos</S.Title>
            <S.Description>
              Acompanhe o andamento das avaliações, médias e resolva empates na
              banca.
            </S.Description>
          </S.HeaderTitles>

          <S.ButtonGroup>
            <Button variant="primary" onClick={handleGoToEvaluators}>
              <Users size={16} />
              <span>Gerenciar Avaliadores</span>
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Sair do Sistema</span>
            </Button>
          </S.ButtonGroup>
        </S.Header>

        <S.CardsContainer>
          <StatCard
            label="Total atribuído"
            value={totalTrabalhos}
            icon={<FileText size={18} />}
            status="total"
          />
          <StatCard
            label="Aguardando nota"
            value={totalPendentes}
            icon={<Clock size={18} />}
            status="pending"
          />
          <StatCard
            label="Enviados"
            value={totalConcluidos}
            icon={<CheckCircle2 size={18} />}
            status="success"
          />
          <StatCard
            label="Em revisão"
            value={totalRevisoes}
            icon={<RefreshCw size={18} />}
            status="revision"
          />
        </S.CardsContainer>

        <FilterBar
          onSearch={handleSearch}
          onFilterStatus={handleFilterStatus}
          onSort={handleSort}
          isAdmin={true}
        />

        <Table
          columns={["Protocolo", "Candidato", "Enviado", "Média Final", "Status", "Ações"]}
          data={mappedData}
          onAction={handleAction}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(
            1,
            Math.ceil(filteredAndSortedData.length / itemsPerPage),
          )}
          onPageChange={setCurrentPage}
        />
      </S.Content>
    </S.Container>
  );
}