import { useLoginForm } from './hooks/useLoginForm';
import {
  Container,
  LoginCard,
  Header,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  ForgotPasswordLink
} from './styles';

export function Login() {
  const { register, submitLogin, errors, isLoading, errorMessage } = useLoginForm();

  return (
    <Container>
      <LoginCard>
        <Header>
          <Title>Acesso Restrito</Title>
          <Subtitle>Painel da Banca Examinadora</Subtitle>
        </Header>

        <Form onSubmit={submitLogin}>
          {/* Mostra erro geral de login (ex: senha incorreta do backend) */}
          {errorMessage && <ErrorMessage style={{ textAlign: 'center' }}>{errorMessage}</ErrorMessage>}

          <InputGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              $hasError={!!errors.email}
              {...register('email')}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              $hasError={!!errors.password}
              {...register('password')}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </InputGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </SubmitButton>
        </Form>

        <ForgotPasswordLink to="/admin/recuperar-senha">
          Esqueci minha senha
        </ForgotPasswordLink>
      </LoginCard>
    </Container>
  );
}