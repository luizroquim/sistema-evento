import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FileDown } from "lucide-react";
import { Accordion } from "../../../components/UI/Accordion";
import { ConflictDetails, Review } from "../../../@types/database";
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
  AverageBox,
  FileLinkButton,
  ReviewHeader,
  ReviewMeta,
  ScoreBadge,
  CriterionList,
  CriterionItem,
  CommentText,
} from "./styles";

// Certifique-se de que o mockConflictDetails esteja disponível ou importado
// O tipo ConflictDetails garante a consistência deste objeto
const mockConflictDetails: ConflictDetails = {
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
  const data: ConflictDetails = mockConflictDetails;

  const averageScore = useMemo(() => {
    const total = data.reviews.reduce(
      (acc: number, r: Review) => acc + Number(r.nota),
      0,
    );
    return (total / (data.reviews.length || 1)).toFixed(2);
  }, [data.reviews]);

  const handleBack = useCallback(
    () => navigate("/admin/dashboard"),
    [navigate],
  );

  const handleReturnToJury = useCallback(() => {
    alert("Trabalho devolvido para a banca.");
    navigate("/admin/dashboard");
  }, [navigate]);

  return (
    <Container>
      <Content>
        <Header>
          <Title>Detalhes da Avaliação</Title>
          <BackButton onClick={handleBack}>Voltar ao Dashboard</BackButton>
        </Header>

        {data.status === "conflito" && (
          <AlertBox>
            <span>
              Clique no botão e devolva para a banca avaliar novamente.
            </span>
            <ReturnButton onClick={handleReturnToJury}>
              Devolver para a Banca
            </ReturnButton>
          </AlertBox>
        )}

        <GridContainer>
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
                <Value>
                  <strong>{data.title}</strong>
                </Value>
              </InfoGroup>
              <InfoGroup>
                <Label>Resumo da Proposta</Label>
                <Value>{data.summary}</Value>
              </InfoGroup>
              <InfoGroup>
                <Label>Documento</Label>
                <Value>
                  <FileLinkButton
                    href={data.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileDown size={16} /> <span>Visualizar PDF</span>
                  </FileLinkButton>
                </Value>
              </InfoGroup>
            </InfoGrid>
          </Card>

          <Card>
            <CardTitle>Pareceres Emitidos</CardTitle>
            <AverageBox>
              <span>Média geral das avaliações</span>
              <strong>{averageScore}</strong>
            </AverageBox>

            {data.reviews.map((review: Review, index: number) => (
              <Accordion
                key={index}
                title={
                  <ReviewHeader>
                    <div>
                      <strong>{review.jurado}</strong>
                      <ReviewMeta>
                        {review.submittedAt
                          ? new Date(review.submittedAt).toLocaleString()
                          : ""}
                      </ReviewMeta>
                    </div>
                    {/* Adicionamos um container com largura mínima para alinhar as notas */}
                    <div style={{ textAlign: "right", minWidth: "80px" }}>
                      <ScoreBadge>Nota: {review.nota.toFixed(1)}</ScoreBadge>
                    </div>
                  </ReviewHeader>
                }
              >
                {review.scores && (
                  <CriterionList>
                    {Object.entries(review.scores).map(([crit, val]) => (
                      <CriterionItem key={crit}>
                        <span>{crit}</span>
                        <strong>{Number(val).toFixed(1)}</strong>
                      </CriterionItem>
                    ))}
                  </CriterionList>
                )}
                <CommentText>"{review.comentario}"</CommentText>
              </Accordion>
            ))}
          </Card>
        </GridContainer>
      </Content>
    </Container>
  );
}
