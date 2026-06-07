import { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileDown, CheckSquare } from "lucide-react";
import { Button } from "../../../components/UI/Button";
import * as S from "./styles";
import { calculateWeightedGrade } from "../../../utils/scoreCalculator";
import { assessmentSchema } from "./schema";

const MOCK_CRITERIA_FROM_DB = [
  {
    id: "crit-1",
    title: "Relevância Cultural",
    description:
      "Avalie o impacto social, originalidade e a contribuição cultural.",
    weight: 1,
  },
  {
    id: "crit-2",
    title: "Viabilidade Executiva",
    description: "Analise se o cronograma, orçamento e equipe são condizentes.",
    weight: 1,
  },
];

// Componente auxiliar para exibir o erro
const ErrorMessage = ({ message }: { message?: string }) =>
  message ? (
    <span
      style={{
        color: "#ef4444",
        fontSize: "0.75rem",
        marginTop: "0.25rem",
        display: "block",
      }}
    >
      {message}
    </span>
  ) : null;

export function JuryAssessment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [scores, setScores] = useState<Record<string, string>>({});
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({}); // Estado para erros

  const projectData = {
    protocol: "REQ-001",
    candidateName: "Ana Carolina Silva",
    title: "A memória das cidades pequenas",
    summary: "Este projeto propõe um mapeamento documental...",
    documentUrl: "#",
  };

  const finalScoreResult = useMemo(() => {
    return calculateWeightedGrade(scores, MOCK_CRITERIA_FROM_DB);
  }, [scores]);

  const handleScoreChange = useCallback(
    (criterionId: string, value: string) => {
      setScores((prev) => ({ ...prev, [criterionId]: value }));
      // Limpa o erro do campo quando o usuário digita
      const key = `scores.${criterionId}`;
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: "" }));
      }
    },
    [errors],
  );

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await assessmentSchema.validate(
        { scores, comments },
        { abortEarly: false },
      );
      setErrors({});
      alert("Avaliação enviada com sucesso!");
      navigate("/jury/dashboard");
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};

      if (err.name === "ValidationError") {
        err.inner.forEach((error: any) => {
          // Mapeia o erro para o caminho correspondente (ex: 'scores' ou 'comments')
          validationErrors[error.path] = error.message;
        });
      }

      // Garantir que cada critério esteja preenchido e tenha valor entre 1 e 10
      MOCK_CRITERIA_FROM_DB.forEach((criterion) => {
        const val = scores[criterion.id];
        const key = `scores.${criterion.id}`;

        if (val === undefined || val === null || String(val).trim() === "") {
          if (!validationErrors[key])
            validationErrors[key] = "A nota é obrigatória";
          return;
        }

        const num = Number(val);
        if (Number.isNaN(num) || num < 1 || num > 10) {
          if (!validationErrors[key])
            validationErrors[key] = "A nota deve ser entre 1 e 10";
        }
      });

      // Garantir parecer
      if (!comments || comments.trim().length === 0) {
        if (!validationErrors.comments)
          validationErrors.comments = "O parecer é obrigatório";
      }

      setErrors(validationErrors);
    }
  };

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.HeaderTitles>
            <S.ProtocolBadge>PROPOSTA {projectData.protocol}</S.ProtocolBadge>
            <S.Title>Avaliação de Projeto</S.Title>
          </S.HeaderTitles>
          <S.BackButton
            type="button"
            onClick={() => navigate("/jury/dashboard")}
          >
            <ArrowLeft size={16} />
            <span>Voltar para o painel</span>
          </S.BackButton>
        </S.Header>

        <form onSubmit={handleFormSubmit} noValidate>
          <S.MainGrid>
            <S.Card>
              <S.SectionTitle>Informações do Candidato</S.SectionTitle>
              <S.InfoGroup>
                <S.Label>Proponente</S.Label>
                <S.TextValue>{projectData.candidateName}</S.TextValue>
              </S.InfoGroup>
              <S.InfoGroup>
                <S.Label>Título do Trabalho</S.Label>
                <S.TextValue style={{ fontWeight: 600 }}>
                  {projectData.title}
                </S.TextValue>
              </S.InfoGroup>
              <S.InfoGroup>
                <S.Label>Resumo da Proposta</S.Label>
                <S.TextValue>{projectData.summary}</S.TextValue>
              </S.InfoGroup>
              <S.FileLinkButton href={projectData.documentUrl} target="_blank">
                <FileDown size={16} />
                <span>Visualizar PDF do Projeto</span>
              </S.FileLinkButton>
            </S.Card>

            <S.Card>
              <S.SectionTitle>Avaliação Técnica</S.SectionTitle>
              {MOCK_CRITERIA_FROM_DB.map((criterion) => (
                <S.CriterionRow key={criterion.id}>
                  <S.CriterionInfo>
                    <S.CriterionName>{criterion.title}</S.CriterionName>
                    <S.CriterionDesc>{criterion.description}</S.CriterionDesc>
                  </S.CriterionInfo>
                  <div style={{ width: "100px" }}>
                    <S.ScoreInput
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      placeholder="0.0"
                      value={scores[criterion.id] || ""}
                      onChange={(e) =>
                        handleScoreChange(criterion.id, e.target.value)
                      }
                    />
                    <ErrorMessage message={errors[`scores.${criterion.id}`]} />
                  </div>
                </S.CriterionRow>
              ))}

              <S.FinalScoreBox $active={finalScoreResult.isComplete}>
                <span className="label">Média Final:</span>
                <span className="value">
                  {finalScoreResult.isComplete
                    ? finalScoreResult.average
                    : "--"}
                </span>
              </S.FinalScoreBox>

              <S.InfoGroup>
                <S.Label>Parecer / Justificativa (Obrigatório)</S.Label>
                <S.TextArea
                  placeholder="Escreva sua análise detalhada aqui..."
                  value={comments}
                  onChange={(e) => {
                    setComments(e.target.value);
                    if (errors.comments)
                      setErrors((prev) => ({ ...prev, comments: "" }));
                  }}
                />
                <ErrorMessage message={errors.comments} />
              </S.InfoGroup>

              <S.ActionArea>
                <Button
                  type="submit"
                  style={{ padding: "0 2rem", height: "44px" }}
                >
                  <CheckSquare size={18} />
                  <span>Finalizar Avaliação</span>
                </Button>
              </S.ActionArea>
            </S.Card>
          </S.MainGrid>
        </form>
      </S.Content>
    </S.Container>
  );
}
