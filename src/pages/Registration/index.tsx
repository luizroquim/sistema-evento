import { useRef } from "react";
import { CheckCircle2, Download, ArrowLeft } from "lucide-react";
import { useTheme } from "styled-components";
import { cpfMask, phoneMask } from "../../utils/masks";
import { Input, Button, Checkbox, Modal, FileInput } from "../../components/UI";
import { useRegistrationForm } from "./hooks/useRegistrationForm";
import { useSubmitRegistration } from "./hooks/useSubmitRegistration";
import * as S from "./styles";

export function Registration() {
  const theme = useTheme();
  const isSubmittingRef = useRef(false);

  const {
    registerCandidate,
    isLoading: isSupabaseLoading,
    error: supabaseError,
    successProtocol,
    resetSubmission,
  } = useSubmitRegistration();

  const {
    register,
    handleSubmit,
    errors,
    isModalOpen,
    formDataTmp,
    handlePreSubmit,
    generateSnowflakeId,
    handleCloseModal,
    handleDownloadProtocol,
    handleResetFormState,
  } = useRegistrationForm();

  const isRealSuccess = !!successProtocol;

  const handleConfirmRegistration = async () => {
    if (!formDataTmp) return;
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;

    try {
      const realProtocolId = generateSnowflakeId();

      const fileList = formDataTmp.documentFile as FileList;
      const file = fileList && fileList.length > 0 ? fileList[0] : null;

      const candidateData = {
        full_name: formDataTmp.fullName,
        document: formDataTmp.document.replace(/\D/g, ""),
        email: formDataTmp.email,
        phone: formDataTmp.phone.replace(/\D/g, ""),
        payment_number: formDataTmp.paymentNumber,
      };

      await registerCandidate(candidateData, file, realProtocolId);
      handleCloseModal();
    } catch (err) {
      console.error(err);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  if (isRealSuccess) {
    return (
      <S.PageContainer>
        <S.FormCard as="div">
          <S.SuccessContainer>
            <CheckCircle2 size={56} color={theme.colors.success} />

            <S.SuccessTitle>Inscrição Concluída!</S.SuccessTitle>

            <S.SuccessSubtitle>
              Os seus dados foram enviados. Um e-mail de confirmação foi
              encaminhado para: <br />
              <span>{formDataTmp?.email}</span>
            </S.SuccessSubtitle>

            <S.ProtocolBox>
              <S.ProtocolLabel>Número do Protocolo</S.ProtocolLabel>
              <S.ProtocolValue>{successProtocol}</S.ProtocolValue>
            </S.ProtocolBox>

            <S.ActionGroup>
              <Button
                type="button"
                variant="primary"
                onClick={() => handleDownloadProtocol(successProtocol)}
              >
                <Download size={18} />
                Baixar Comprovante (.txt)
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  handleResetFormState();
                  resetSubmission();
                  isSubmittingRef.current = false;
                }}
              >
                <ArrowLeft size={18} />
                Voltar ao Início
              </Button>
            </S.ActionGroup>
          </S.SuccessContainer>
        </S.FormCard>
      </S.PageContainer>
    );
  }

  return (
    <S.PageContainer>
      <S.FormCard onSubmit={handleSubmit(handlePreSubmit)}>
        <S.HeaderGroup>
          <S.FormTitle>Inscrição para o Concurso</S.FormTitle>
          <S.FormSubtitle>
            Preencha seus dados abaixo para iniciar o processo de inscrição.
          </S.FormSubtitle>
        </S.HeaderGroup>

        {supabaseError && <S.ErrorAlert>{supabaseError}</S.ErrorAlert>}

        <Input
          id="paymentNumber"
          label="Número da Inscrição (Recebido no Pagamento)"
          placeholder="Digite o código ou número do comprovante"
          error={errors.paymentNumber?.message}
          {...register("paymentNumber")}
        />

        <Input
          id="fullName"
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <S.RowGroup>
          <Input
            id="document"
            label="CPF"
            placeholder="000.000.000-00"
            maxLength={14}
            error={errors.document?.message}
            {...register("document", {
              onChange: (e) => {
                e.target.value = cpfMask(e.target.value);
              },
            })}
          />

          <Input
            id="phone"
            label="Telefone Celular"
            placeholder="(35) 99999-9999"
            maxLength={15}
            error={errors.phone?.message}
            {...register("phone", {
              onChange: (e) => {
                e.target.value = phoneMask(e.target.value);
              },
            })}
          />
        </S.RowGroup>

        <Input
          id="email"
          label="E-mail"
          type="email"
          placeholder="seu.email@exemplo.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <FileInput
          id="documentFile"
          label="Documento (PDF até 5mb)"
          accept=".pdf,.png,.jpg,.jpeg"
          error={errors.documentFile?.message}
          {...register("documentFile")}
        />

        <Checkbox
          id="termsAccepted"
          error={errors.termsAccepted?.message}
          {...register("termsAccepted")}
          label={
            <>
              Li e estou de acordo com o{" "}
              <a
                href="/regulamento.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Regulamento Oficial do Concurso
              </a>
              .
            </>
          }
        />

        <Button
          type="submit"
          variant="primary"
          isLoading={isSupabaseLoading}
          disabled={isSupabaseLoading}
        >
          Enviar
        </Button>
      </S.FormCard>

      <Modal
        isOpen={isModalOpen}
        title="Confirmar Dados da Inscrição"
        onClose={handleCloseModal}
        onConfirm={handleConfirmRegistration}
        isLoading={isSupabaseLoading}
      >
        <S.ModalText>
          Olá, <strong>{formDataTmp?.fullName}</strong>!
        </S.ModalText>

        <S.ModalSubText>Confirma o envio dos seus dados?</S.ModalSubText>

        {isSupabaseLoading && (
          <S.LoadingFeedback>
            Processando arquivos e salvando dados...
          </S.LoadingFeedback>
        )}
      </Modal>
    </S.PageContainer>
  );
}