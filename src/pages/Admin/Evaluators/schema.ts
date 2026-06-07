import * as Yup from 'yup';

export const evaluatorSchema = Yup.object().shape({
  name: Yup.string()
    .required('O nome completo é obrigatório.')
    .min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: Yup.string()
    .email('Digite um e-mail válido.')
    .required('O e-mail de acesso é obrigatório.'),
  password: Yup.string()
    .required('A senha provisória é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});