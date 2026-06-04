import { cpfMask, phoneMask } from '../../utils/masks';
import { Input, Button, Checkbox, Modal } from '../../components/UI';
import { useRegistrationForm } from './hooks/useRegistrationForm';
import * as S from './styles';

export function Registration() {

  const {
    register,
    handleSubmit,
    errors,
    isModalOpen,
    isSubmitting,
    formDataTmp,
    handlePreSubmit,
    handleFinalConfirm,
    handleCloseModal
  } = useRegistrationForm();

  return (
    <S.PageContainer>
      <S.FormCard onSubmit={handleSubmit(handlePreSubmit)}>
        <S.FormTitle>Inscrição para o Concurso</S.FormTitle>
        <S.FormSubtitle>
          Preencha seus dados abaixo para iniciar o processo de inscrição.
        </S.FormSubtitle>

        <Input
          id="fullName"
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          id="document"
          label="CPF"
          placeholder="000.000.000-00"
          maxLength={14}
          error={errors.document?.message}
          {...register('document', {
            onChange: (e) => { e.target.value = cpfMask(e.target.value); }
          })}
        />

        <Input
          id="email"
          label="E-mail"
          type="email"
          placeholder="seu.email@exemplo.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          id="phone"
          label="Telefone Celular"
          placeholder="(35) 99999-9999"
          maxLength={15}
          error={errors.phone?.message}
          {...register('phone', {
            onChange: (e) => { e.target.value = phoneMask(e.target.value); }
          })}
        />

        <Checkbox
          id="termsAccepted"
          error={errors.termsAccepted?.message}
          {...register('termsAccepted')}
          label={
            <>
              Li e estou de acordo com o{' '}
              <a href="/regulamento.pdf" target="_blank" rel="noopener noreferrer">
                Regulamento Oficial do Concurso
              </a>.
            </>
          }
        />

        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Avançar para o Pagamento
        </Button>
      </S.FormCard>

      <Modal
        isOpen={isModalOpen}
        title="Confirmar Dados da Inscrição"
        onClose={handleCloseModal}
        onConfirm={handleFinalConfirm}
      >
        <p style={{ lineHeight: 1.5 }}>
          Olá, <strong>{formDataTmp?.fullName}</strong>!
        </p>
        <p style={{ marginTop: '0.5rem', color: '#555', lineHeight: 1.5 }}>
          Confirma que os seus dados de contato e o CPF <strong>{formDataTmp?.document}</strong> estão corretos? Após a confirmação, você será direcionado para a etapa final.
        </p>
      </Modal>
    </S.PageContainer>
  );
}