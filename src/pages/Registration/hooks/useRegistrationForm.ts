import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema, RegistrationFormData } from "../schema";
import { generateProtocolTemplate } from "../utils/generateProtocolTemplate";

export function useRegistrationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDataTmp, setFormDataTmp] = useState<RegistrationFormData | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [protocolNumber, setProtocolNumber] = useState("");

  const CUSTOM_EPOCH = 1735689600000;
  const lastTimestamp = useRef(-1);
  const sequence = useRef(0);
  const workerId = 1;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: "onTouched",
  });

  const handlePreSubmit = useCallback((data: RegistrationFormData) => {
    setFormDataTmp(data);
    setIsModalOpen(true);
  }, []);

  const handleFinalConfirm = useCallback(async () => {
    setIsModalOpen(false);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      let timestamp = Date.now();
      if (timestamp === lastTimestamp.current) {
        sequence.current = (sequence.current + 1) & 4095;
        if (sequence.current === 0) {
          while (timestamp <= lastTimestamp.current) {
            timestamp = Date.now();
          }
        }
      } else {
        sequence.current = 0;
      }
      lastTimestamp.current = timestamp;

      const timePassed = BigInt(timestamp - CUSTOM_EPOCH);
      const snowflakeId =
        (timePassed << 22n) |
        (BigInt(workerId) << 12n) |
        BigInt(sequence.current);

      const generatedProtocol = snowflakeId.toString();
      setProtocolNumber(generatedProtocol);
      setIsSuccess(true);

      setTimeout(() => {
        reset();
      }, 0);
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [reset, formDataTmp, CUSTOM_EPOCH]);

  const handleDownloadProtocol = useCallback(() => {
    if (!formDataTmp || !protocolNumber) return;

    const fileContent = generateProtocolTemplate({
      formData: formDataTmp,
      protocolNumber,
    });

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `comprovante-${protocolNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [formDataTmp, protocolNumber]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleResetSuccess = useCallback(() => {
    setIsSuccess(false);
    setProtocolNumber("");
    setFormDataTmp(null);
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    isModalOpen,
    isSubmitting,
    formDataTmp,
    isSuccess,
    protocolNumber,
    handlePreSubmit,
    handleFinalConfirm,
    handleCloseModal,
    handleDownloadProtocol,
    handleResetSuccess,
  };
}