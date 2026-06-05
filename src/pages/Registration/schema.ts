import * as yup from "yup";
import { cpf } from "cpf-cnpj-validator";
import { registrationService } from "../../services/registrationService";

const phoneRegExp = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["application/pdf", "image/jpeg", "image/png"];

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
      )
      .test(
        "is-unique-cpf",
        "Este CPF já está inscrito no concurso",
        async function (value: string | undefined) {
          if (!value) return false;

          const cleanCPF = value.replace(/\D/g, "");
          
          if (cleanCPF.length !== 11) return true;

          const isDuplicated = await registrationService.checkExistingCPF(cleanCPF);

          return !isDuplicated;
        }
      ),

    email: yup
      .string()
      .required("O e-mail é obrigatório")
      .email("Insira um e-mail válido"),

    phone: yup
      .string()
      .required("O telefone celular é obrigatório")
      .matches(phoneRegExp, "Telefone inválido. Use o formato (XX) XXXXX-XXXX"),

    documentFile: yup
      .mixed<FileList>()
      .required("O documento é obrigatório")
      .test("required", "Selecione um arquivo de documento", (value) => {
        return value && value.length > 0;
      })
      .test("fileSize", "O arquivo é muito grande (máx 5MB)", (value) => {
        return value && value[0] ? value[0].size <= MAX_FILE_SIZE : true;
      })
      .test(
        "fileType",
        "Formato inválido (apenas PDF, JPG ou PNG)",
        (value) => {
          return value && value[0]
            ? SUPPORTED_FORMATS.includes(value[0].type)
            : true;
        },
      ),

    paymentNumber: yup
      .string()
      .required("O número da inscrição de pagamento é obrigatório")
      .min(2, "O número de inscrição inválido (muito curto)"),

    termsAccepted: yup
      .boolean()
      .oneOf([true], "Você precisa ler e aceitar o regulamento para continuar")
      .required(),
  })
  .required();

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;