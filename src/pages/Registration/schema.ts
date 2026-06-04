import * as yup from "yup";
import { cpf } from "cpf-cnpj-validator";

const phoneRegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const registrationSchema = yup
  .object({
    fullName: yup
      .string()
      .required("O nome completo é obrigatório")
      .min(3, "O nome deve ter pelo menos 3 caracteres"),

   document: yup
  .string()
  .required("O CPF é obrigatório")
  .test(
    "is-valid-cpf",
    "CPF inválido ou inexistente",
    function (value: string | undefined) {
    
      if (!value) return false;

      const cleanCPF = value.replace(/\D/g, "");

      
      if (cleanCPF.length < 11 || !cpf.isValid(cleanCPF)) {
        return this.createError({
          message: "CPF inválido ou inexistente",
        });
      }

      return true;
    },
  ),

    email: yup
      .string()
      .required("O e-mail é obrigatório")
      .email("Insira um e-mail válido"),

    phone: yup
      .string()
      .required("O telefone celular é obrigatório")
      .matches(phoneRegExp, "Telefone inválido. Use o formato (XX) XXXXX-XXXX"),

    termsAccepted: yup
      .boolean()
      .oneOf([true], "Você precisa ler e aceitar o regulamento para continuar")
      .required(),
  })
  .required();

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
