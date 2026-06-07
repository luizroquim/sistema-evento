// src/pages/Jury/Assessment/schema.ts
import * as Yup from "yup";

export const assessmentSchema = Yup.object().shape({
  scores: Yup.object().test(
    "preenchidos",
    "Preencha todas as notas de 1 a 10",
    (value: any) => {
      // Valida se todos os critérios do MOCK_CRITERIA_FROM_DB estão com notas entre 1 e 10
      return (
        value &&
        Object.keys(value).length >= 2 &&
        Object.values(value).every((v) => Number(v) >= 1 && Number(v) <= 10)
      );
    },
  ),
  comments: Yup.string().optional(),
});
