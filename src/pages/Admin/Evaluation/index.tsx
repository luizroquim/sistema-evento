import { useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  Header,
  Title,
  BackButton,
  GridContainer,
  Card,
  CardTitle,
  InfoGrid,
  InfoGroup,
  Label,
  Value,
  AlertBox,
  ReturnButton,
  ReviewCard,
  AverageBox,
  FileLinkButton,
} from "./styles";
import { FileDown } from "lucide-react";

// Mock do Candidato que está em Conflito
const mockConflictDetails = {
  id: "123e4567-e89b-12d3-a456-426614174003",
  name: "Beatriz Souza",
  protocol: "REQ-003",
  status: "conflito",
  title: "Oficinas e memória local",
  summary:
    "Projeto que mapeia práticas culturais locais por meio de oficinas participativas e acervos comunitários.",
  documentUrl: "#",
  reviews: [
    {
      jurado: "Prof. Roberto Almeida",
      nota: 9.0,
      recomendacao: "aprovado",
      comentario:
        "Excelente estruturação do código. Atende todos os requisitos.",
      submittedAt: "2026-06-05T10:23:00Z",
      scores: { "Relevância Cultural": 4.5, "Viabilidade Executiva": 4.5 },
    },
    {
      jurado: "Dra. Camila Mendes",
      nota: 4.0,
      recomendacao: "reprovado",
      comentario: "Encontrei falhas graves de segurança na autenticação.",
      submittedAt: "2026-06-05T12:47:00Z",
      scores: { "Relevância Cultural": 2.0, "Viabilidade Executiva": 2.0 },
    },
  ],
};

export function AdminEvaluation() {
  const navigate = useNavigate();
  const data = mockConflictDetails;

  const handleBack = () => navigate("/admin/dashboard");

  const handleReturnToJury = () => {
    // 🚧 Futuramente: UPDATE no Supabase mudando o status para 'pendente' novamente
    alert(
      "Trabalho devolvido! Os jurados receberão um aviso para revisarem as notas em consenso.",
    );
    navigate("/admin/dashboard");
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>Detalhes da Avaliação</Title>
          <BackButton onClick={handleBack}>Voltar ao Dashboard</BackButton>
        </Header>

        {/* ALERTA DE CONFLITO E BOTÃO DE AÇÃO DO ADMIN */}
        {data.status === "conflito" && (
          <AlertBox>
            <ReturnButton onClick={handleReturnToJury}>
              Devolver para a Banca
            </ReturnButton>
          </AlertBox>
        )}

        <GridContainer>
          {/* COLUNA 1: DADOS DO PROJETO */}
          <Card>
            <CardTitle>Informações do Candidato</CardTitle>
            <InfoGrid>
              <InfoGroup>
                <Label>Proponente</Label>
                <Value>
                  <strong>{data.name}</strong>
                </Value>
              </InfoGroup>
              <InfoGroup>
                <Label>Protocolo</Label>
                <Value>{data.protocol}</Value>
              </InfoGroup>
              <InfoGroup>
                <Label>Título do Trabalho</Label>
                <Value style={{ fontWeight: 700 }}>{data.title}</Value>
              </InfoGroup>
              <InfoGroup>
                <Label>Resumo da Proposta</Label>
                <Value style={{ color: "#374151" }}>{data.summary}</Value>
              </InfoGroup>
              <InfoGroup>
                <Label>Documento</Label>
                <Value>
                  <FileLinkButton
                    href={data.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileDown size={16} />
                    <span>Visualizar PDF do Projeto</span>
                  </FileLinkButton>
                </Value>
              </InfoGroup>
            </InfoGrid>
          </Card>

          {/* COLUNA 2: PARECERES DA BANCA */}
          <Card>
            <CardTitle>Pareceres Emitidos</CardTitle>

            {/* Média geral dos jurados */}
            <AverageBox>
              <span>Média geral das avaliações</span>
              <span>
                {(
                  data.reviews.reduce((acc, r) => acc + Number(r.nota), 0) /
                  (data.reviews.length || 1)
                ).toFixed(2)}
              </span>
            </AverageBox>

            {data.reviews.map((review, index) => (
              <ReviewCard key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <strong>{review.jurado}</strong>
                    <div style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                      {review.submittedAt
                        ? new Date(review.submittedAt).toLocaleString()
                        : ""}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Nota: {review.nota.toFixed(1)}
                    </div>
                  </div>
                </div>
                {/* Notas por critério, se disponíveis */}
                {review.scores && (
                  <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                    {Object.entries(review.scores).map(([crit, val]) => (
                      <div
                        key={crit}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.85rem",
                          color: "#374151",
                        }}
                      >
                        <span>{crit}</span>
                        <strong>{Number(val).toFixed(1)}</strong>
                      </div>
                    ))}
                  </div>
                )}
                <p
                  style={{
                    fontSize: "0.85rem",
                    marginTop: "0.5rem",
                    color: "#4b5563",
                  }}
                >
                  "{review.comentario}"
                </p>
              </ReviewCard>
            ))}
          </Card>
        </GridContainer>
      </Content>
    </Container>
  );
}
