import { useState, FormEvent, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, PlusCircle, ArrowLeft } from 'lucide-react';
import { evaluatorSchema } from './schema';
import { Button } from '../../../components/UI/Button';
import * as S from './styles';

interface Evaluator {
  id: string;
  name: string;
  email: string;
}

const INITIAL_EVALUATORS: Evaluator[] = [
  { id: '1', name: 'Prof. Roberto Almeida', email: 'roberto.almeida@universidade.com' },
  { id: '2', name: 'Dra. Camila Mendes', email: 'camila.mendes@universidade.com' }
];

// Sub-componente isolado e memorizado para evitar re-renderizações ao digitar nos inputs
const EvaluatorRow = memo(({ evaluator, onDelete }: { evaluator: Evaluator; onDelete: (id: string, name: string) => void }) => {
  return (
    <tr>
      <S.Td>
        <strong>{evaluator.name}</strong>
      </S.Td>
      <S.Td>{evaluator.email}</S.Td>
      <S.TdAction>
        <Button variant="secondary" onClick={() => onDelete(evaluator.id, evaluator.name)}>
          <Trash2 size={16} />
          <span>Remover Acesso</span>
        </Button>
      </S.TdAction>
    </tr>
  );
});

EvaluatorRow.displayName = 'EvaluatorRow';

const ErrorMessage = memo(({ message }: { message?: string }) => 
  message ? <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{message}</span> : null
);

ErrorMessage.displayName = 'ErrorMessage';

export function Evaluators() {
  const navigate = useNavigate();

  // Estados dinâmicos e reativos
  const [evaluators, setEvaluators] = useState<Evaluator[]>(INITIAL_EVALUATORS);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBack = useCallback(() => {
    navigate('/admin/dashboard');
  }, [navigate]);

  // Memorizado com useCallback para performance
  const handleAddEvaluator = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    try {
      await evaluatorSchema.validate({ name, email, password }, { abortEarly: false });
      setErrors({});

      const newEvaluator: Evaluator = {
        id: crypto.randomUUID(), // Gera um ID único e performático no navegador
        name,
        email
      };

      setEvaluators((prev) => [...prev, newEvaluator]);
      alert(`Avaliador ${name} cadastrado com sucesso!`);
      
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  }, [name, email, password]);

  // Memorizado com useCallback para não quebrar a otimização do memo das linhas
  const handleDelete = useCallback((id: string, name: string) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja remover o acesso de ${name}?`);
    if (confirmDelete) {
      setEvaluators((prev) => prev.filter((evaluator) => evaluator.id !== id));
      alert('Avaliador removido do sistema.');
    }
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <S.HeaderTitles>
            <S.Title>Gestão da Banca Examinadora</S.Title>
            <S.Description>Cadastre os avaliadores.</S.Description>
          </S.HeaderTitles>
          <S.BackButton type="button" onClick={handleBack}>
            <ArrowLeft size={16} />
            <span>Voltar ao Dashboard</span>
          </S.BackButton>
        </S.Header>

        {/* FORMULÁRIO DE CADASTRO */}
        <S.AddFormContainer onSubmit={handleAddEvaluator} noValidate>
          <S.FormGroup>
            <S.Label htmlFor="name">Nome Completo</S.Label>
            <S.Input 
              id="name" 
              type="text" 
              placeholder="Ex: João da Silva" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
            />
            <ErrorMessage message={errors.name} />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="email">E-mail de Acesso</S.Label>
            <S.Input 
              id="email" 
              type="email" 
              placeholder="professor@email.com" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
            />
            <ErrorMessage message={errors.email} />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="password">Senha Provisória</S.Label>
            <S.Input 
              id="password" 
              type="text" 
              placeholder="Min. 6 caracteres" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
              }}
            />
            <ErrorMessage message={errors.password} />
          </S.FormGroup>

          <S.SubmitButtonContainer>
            <Button type="submit">
              <PlusCircle size={16} />
              <span>Cadastrar</span>
            </Button>
          </S.SubmitButtonContainer>
        </S.AddFormContainer>

        {/* LISTA DE AVALIADORES */}
        <S.TableContainer>
          <S.Table>
            <thead>
              <tr>
                <S.Th>Nome do Avaliador</S.Th>
                <S.Th>E-mail (Login)</S.Th>
                <S.ThAction>Ação</S.ThAction>
              </tr>
            </thead>
            <tbody>
              {evaluators.map((evaluator) => (
                <EvaluatorRow 
                  key={evaluator.id} 
                  evaluator={evaluator} 
                  onDelete={handleDelete} 
                />
              ))}
              {evaluators.length === 0 && (
                <tr>
                  <S.EmptyTd colSpan={3}>
                    Nenhum avaliador cadastrado ainda.
                  </S.EmptyTd>
                </tr>
              )}
            </tbody>
          </S.Table>
        </S.TableContainer>
      </S.Content>
    </S.Container>
  );
}