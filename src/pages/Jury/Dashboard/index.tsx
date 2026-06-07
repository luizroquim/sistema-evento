import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, CheckCircle2, RefreshCw } from "lucide-react";

// Seus Componentes UI
import { Button } from "../../../components/UI/Button";
import { StatCard } from "../../../components/UI/StatCard";
import { FilterBar } from "../../../components/UI/FilterBar";
import { Table } from "../../../components/UI/Table";
import { Pagination } from "../../../components/UI/Pagination";

// Estilos específicos da página
import {
  Container,
  Content,
  Header,
  HeaderTitles,
  Title,
  Subtitle,
  Description,
  StatsGrid,
} from "./styles";

// Mock estendido para testar os filtros e ordenação perfeitamente
const MOCK_PROJECTS = [
  {
    id: "1",
    protocol: "REQ-001",
    name: "Ana Carolina Silva",
    projectTitle: "A memória das cidades pequenas",
    date: "28 mai 2026",
    myVoteStatus: "pendente",
  },
  {
    id: "2",
    protocol: "REQ-003",
    name: "Beatriz Souza",
    projectTitle: "Versos sobre o silêncio",
    date: "30 mai 2026",
    myVoteStatus: "revisao",
  },
  {
    id: "3",
    protocol: "REQ-005",
    name: "Helena Martins",
    projectTitle: "Educação como prática de liberdade",
    date: "15 mai 2026",
    myVoteStatus: "avaliado",
  },
  {
    id: "4",
    protocol: "REQ-002",
    name: "Carlos Eduardo",
    projectTitle: "Tecnologia na Roça",
    date: "01 jun 2026",
    myVoteStatus: "pendente",
  },
  {
    id: "5",
    protocol: "REQ-004",
    name: "Daniela Oliveira",
    projectTitle: "O Eco do Vento",
    date: "02 jun 2026",
    myVoteStatus: "avaliado",
  },
  {
    id: "6",
    protocol: "REQ-006",
    name: "Felipe Augusto",
    projectTitle: "Urbanismo Sustentável",
    date: "03 jun 2026",
    myVoteStatus: "pendente",
  },
  {
    id: "7",
    protocol: "REQ-007",
    name: "Gabriela Costa",
    projectTitle: "Expressões Macabras na Arte",
    date: "04 jun 2026",
    myVoteStatus: "revisao",
  },
  {
    id: "8",
    protocol: "REQ-008",
    name: "Igor Miranda",
    projectTitle: "Algoritmos de Alta Performance",
    date: "05 jun 2026",
    myVoteStatus: "avaliado",
  },
  {
    id: "9",
    protocol: "REQ-009",
    name: "Juliana Mendes",
    projectTitle: "História Oculta das Minas",
    date: "06 jun 2026",
    myVoteStatus: "pendente",
  },
  {
    id: "10",
    protocol: "REQ-010",
    name: "Lucas Reis",
    projectTitle: "Arquitetura e Luz Natural",
    date: "07 jun 2026",
    myVoteStatus: "avaliado",
  },
  {
    id: "11",
    protocol: "REQ-011",
    name: "Mariana Fontes",
    projectTitle: "A Poesia do Cotidiano",
    date: "08 jun 2026",
    myVoteStatus: "pendente",
  },
];

export function JuryDashboard() {
  const navigate = useNavigate();

  // Estados de Paginação Dinâmica (Computador v. Celular)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth >= 768 ? 10 : 5,
  );

  // Estados dos Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [sortOrder, setSortOrder] = useState("az");

  // Escuta mudança de tamanho da tela para ajustar itens por página
  useEffect(() => {
    function handleResize() {
      setItemsPerPage(window.innerWidth >= 768 ? 10 : 5);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. CÁLCULO DINÂMICO DOS CARDS DE ESTATÍSTICAS (Baseado no array original)
  const stats = useMemo(() => {
    return MOCK_PROJECTS.reduce(
      (acc, item) => {
        acc.total += 1;
        if (item.myVoteStatus === "pendente") acc.pending += 1;
        if (item.myVoteStatus === "avaliado") acc.success += 1;
        if (item.myVoteStatus === "revisao") acc.revision += 1;
        return acc;
      },
      { total: 0, pending: 0, success: 0, revision: 0 },
    );
  }, []);

  // Handlers memoizados para os filtros (Garante que o FilterBar não re-renderize à toa)
  const handleSearch = useCallback((val: string) => {
    setSearchQuery(val);
    setCurrentPage(1); // Reseta para a primeira página ao buscar
  }, []);

  const handleFilterStatus = useCallback((status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reseta ao mudar filtro
  }, []);

  const handleSort = useCallback((sort: string) => {
    setSortOrder(sort);
    setCurrentPage(1); // Reseta ao mudar ordenação
  }, []);

  const handleExecuteAction = useCallback(
    (id: string) => {
      navigate(`/jury/assessment/${id}`);
    },
    [navigate],
  );

  // 2. FILTRAGEM E ORDENAÇÃO PERFORMÁTICA DOS DADOS (Cascata Inteligente)
  const filteredAndSortedData = useMemo(() => {
    let result = [...MOCK_PROJECTS];

    // Passo A: Filtro por Texto (Nome, Protocolo ou Título)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.protocol.toLowerCase().includes(query) ||
          p.projectTitle.toLowerCase().includes(query),
      );
    }

    // Passo B: Filtro por Status Select
    if (statusFilter !== "todos") {
      result = result.filter((p) => p.myVoteStatus === statusFilter);
    }

    // Passo C: Ordenação de Dados
    if (sortOrder === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "recentes") {
      result.sort((a, b) => b.id.localeCompare(a.id)); // Simulando por ID decrescente para o mock
    } else if (sortOrder === "antigos") {
      result.sort((a, b) => a.id.localeCompare(b.id)); // Simulando por ID crescente
    }

    return result;
  }, [searchQuery, statusFilter, sortOrder]);

  // 3. FATIAMENTO DOS DADOS FILTRADOS PARA A PAGINAÇÃO
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(start, start + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  // 4. MAPEAMENTO DINÂMICO DOS LABELS E AÇÕES DO BOTÃO
  const paginatedDataMapped = useMemo(() => {
    return paginatedData.map((project) => ({
      ...project,
      // Passa o status de forma amigável para o componente de Tabela ler se necessário
      statusLabel:
        project.myVoteStatus === "avaliado"
          ? "Concluído"
          : project.myVoteStatus === "revisao"
            ? "Em revisão"
            : "Pendente",

      // Controla dinamicamente a string do botão de ação da tabela
      actionLabel:
        project.myVoteStatus === "pendente" ? "Avaliar" : "Editar Nota",
    }));
  }, [paginatedData]);

  return (
    <Container>
      <Content>
        {/* HEADER */}
        <Header>
          <HeaderTitles>
            <Subtitle>Painel do Jurado</Subtitle>
            <Title>Minhas Avaliações</Title>
            <Description>
              Acompanhe os trabalhos e responda a pedidos de revisão.
            </Description>
          </HeaderTitles>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            → Sair
          </Button>
        </Header>

        {/* ESTATÍSTICAS DINÂMICAS */}
        <StatsGrid>
          <StatCard
            label="Total atribuído"
            value={stats.total}
            icon={<FileText size={18} />}
            status="total"
          />
          <StatCard
            label="Aguardando nota"
            value={stats.pending}
            icon={<Clock size={18} />}
            status="pending"
          />
          <StatCard
            label="Enviados"
            value={stats.success}
            icon={<CheckCircle2 size={18} />}
            status="success"
          />
          <StatCard
            label="Em revisão"
            value={stats.revision}
            icon={<RefreshCw size={18} />}
            status="revision"
          />
        </StatsGrid>

        {/* BUSCA E FILTROS */}
        <FilterBar
          onSearch={handleSearch}
          onFilterStatus={handleFilterStatus}
          onSort={handleSort}
        />

        {/* TABELA / CARDS MOBILE COM OS DADOS MAPEADOS */}
        <Table
          columns={["Protocolo", "Candidato", "Enviado", "Status", "Ações"]}
          data={paginatedDataMapped}
          onAction={handleExecuteAction}
        />

        {/* PAGINAÇÃO CONECTADA AO ARRAY FILTRADO */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(
            1,
            Math.ceil(filteredAndSortedData.length / itemsPerPage),
          )}
          onPageChange={setCurrentPage}
        />
      </Content>
    </Container>
  );
}
