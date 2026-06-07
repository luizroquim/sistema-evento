import * as Yup from "yup";

// Importe seus critérios reais aqui
const MOCK_CRITERIA_FROM_DB = [
  { id: "crit-1" },
  { id: "crit-2" },
];

const scoreSchema = MOCK_CRITERIA_FROM_DB.reduce((acc, criterion) => {
  acc[criterion.id] = Yup.number()
    .typeError("A nota deve ser um número")
    .required("A nota é obrigatória")
    .min(1, "Mínimo 1")
    .max(10, "Máximo 10");
  return acc;
}, {} as Record<string, any>);

export const assessmentSchema = Yup.object().shape({
  scores: Yup.object().shape(scoreSchema),
  // Aqui tornamos o campo opcional novamente
  comments: Yup.string().optional(),
});