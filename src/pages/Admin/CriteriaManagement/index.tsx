import { useCallback, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, Trash2, Edit2, ArrowLeft } from "lucide-react";
import { Input } from "../../../components/UI/Input"; // Ajuste o caminho conforme necessário
import { Criterion } from "../../../@types/database";

import {
  Container,
  Content,
  Header,
  Title,
  BackButton,
  MainGrid,
  Card,
  CardTitle,
  Form,
  SubmitButton,
  CriteriaListContainer,
  CriterionCard,
  CriterionInfo,
  ActionsContainer,
  IconButton,
  EmptyState,
} from "./styles";

// 1. Schema do formulário - Reduzido apenas para Título e Descrição
const criterionSchema = yup
  .object({
    title: yup
      .string()
      .required("O título do critério é obrigatório")
      .min(3, "Mínimo de 3 caracteres"),
    description: yup.string().required("A descrição do critério é obrigatória"),
  })
  .required();

type FormData = yup.InferType<typeof criterionSchema>;

// Mock inicial atualizado sem a propriedade weight
const initialCriteria: Criterion[] = [
  {
    id: "1",
    title: "Relevância Cultural",
    description: "Impacto nas tradições locais.",
  },
  {
    id: "2",
    title: "Viabilidade Executiva",
    description: "Análise de cronograma e orçamento.",
  },
];

// ==========================================
// COMPONENTE FORMULÁRIO (ISOLADO PARA PERFORMANCE)
// ==========================================
interface FormComponentProps {
  onSubmit: (data: FormData, resetForm: () => void) => void;
  editingCriterion: Criterion | null;
  onCancelEdit: () => void;
}

const CriteriaForm = ({
  onSubmit,
  editingCriterion,
  onCancelEdit,
}: FormComponentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(criterionSchema),
    values: editingCriterion
      ? {
          title: editingCriterion.title,
          description: editingCriterion.description,
        }
      : {
          title: "",
          description: "",
        },
  });

  const handleLocalSubmit = (data: FormData) => {
    onSubmit(data, () => reset());
  };

  return (
    <Card>
      <CardTitle>
        {editingCriterion ? "Editar Critério" : "Novo Critério"}
      </CardTitle>
      <Form onSubmit={handleSubmit(handleLocalSubmit)}>
        <Input
          label="Título do Critério"
          placeholder="Ex: Inovação Tecnológica"
          error={errors.title?.message}
          {...register("title")}
        />

        <Input
          label="Descrição / Orientação para a Banca"
          placeholder="Explique o que o jurado deve analisar..."
          error={errors.description?.message}
          {...register("description")}
        />

        <SubmitButton type="submit">
          <Plus size={18} />
          {editingCriterion ? "Salvar Alterações" : "Adicionar Critério"}
        </SubmitButton>

        {editingCriterion && (
          <IconButton
            type="button"
            style={{ width: "100%", fontSize: "0.85rem", marginTop: "0.5rem" }}
            onClick={onCancelEdit}
          >
            Cancelar Edição
          </IconButton>
        )}
      </Form>
    </Card>
  );
};

// ==========================================
// COMPONENTE ITEM DA LISTA (MEMORIZADO COM memo)
// ==========================================
interface CriterionItemProps {
  criterion: Criterion;
  onEdit: (criterion: Criterion) => void;
  onDelete: (id: string) => void;
}

const CriterionRowItem = memo(
  ({ criterion, onEdit, onDelete }: CriterionItemProps) => {
    return (
      <CriterionCard>
        <CriterionInfo>
          <strong>{criterion.title}</strong>
          <p>{criterion.description}</p>
        </CriterionInfo>

        <ActionsContainer>
          <IconButton
            type="button"
            title="Editar"
            onClick={() => onEdit(criterion)}
          >
            <Edit2 size={16} />
          </IconButton>
          <IconButton
            type="button"
            $variant="delete"
            title="Excluir"
            onClick={() => onDelete(criterion.id)}
          >
            <Trash2 size={16} />
          </IconButton>
        </ActionsContainer>
      </CriterionCard>
    );
  },
);

CriterionRowItem.displayName = "CriterionRowItem";

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export function CriteriaManagement() {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState<Criterion[]>(initialCriteria);
  const [editingCriterion, setEditingCriterion] = useState<Criterion | null>(
    null,
  );

  const handleBack = useCallback(
    () => navigate("/admin/dashboard"),
    [navigate],
  );

  const handleFormSubmit = useCallback(
    (data: FormData, resetForm: () => void) => {
      setCriteria((prev) => {
        if (editingCriterion) {
          return prev.map((c) =>
            c.id === editingCriterion.id ? { ...c, ...data } : c,
          );
        } else {
          return [...prev, { id: crypto.randomUUID(), ...data }];
        }
      });
      setEditingCriterion(null);
      resetForm();
    },
    [editingCriterion],
  );

  const handleEditClick = useCallback((criterion: Criterion) => {
    setEditingCriterion(criterion);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingCriterion(null);
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    if (confirm("Deseja realmente remover este critério?")) {
      setCriteria((prev) => prev.filter((c) => c.id !== id));
      setEditingCriterion((current) => (current?.id === id ? null : current));
    }
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <Title>Gerenciamento de Critérios de Nota</Title>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={16} /> Voltar ao Dashboard
          </BackButton>
        </Header>

        <MainGrid>
          <CriteriaForm
            onSubmit={handleFormSubmit}
            editingCriterion={editingCriterion}
            onCancelEdit={handleCancelEdit}
          />

          <Card>
            <CardTitle>Critérios Ativos no Sistema</CardTitle>
            <CriteriaListContainer>
              {criteria.length === 0 ? (
                <EmptyState>Nenhum critério cadastrado ainda.</EmptyState>
              ) : (
                criteria.map((criterion) => (
                  <CriterionRowItem
                    key={criterion.id}
                    criterion={criterion}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))
              )}
            </CriteriaListContainer>
          </Card>
        </MainGrid>
      </Content>
    </Container>
  );
}