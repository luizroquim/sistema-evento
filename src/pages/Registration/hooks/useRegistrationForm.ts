import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema, RegistrationFormData } from "../schema";
import { generateProtocolTemplate } from "../utils/generateProtocolTemplate";

export function useRegistrationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataTmp, setFormDataTmp] = useState<RegistrationFormData | null>(
    null,
  );

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
    mode: "onBlur",
  });

  const handlePreSubmit = useCallback((data: RegistrationFormData) => {
    setFormDataTmp(data);
    setIsModalOpen(true);
  }, []);

  const generateSnowflakeId = useCallback(() => {
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

    return generatedProtocol;
  }, [CUSTOM_EPOCH]);

  const handleDownloadProtocol = useCallback(
    (externalProtocol?: string | null) => {
      const activeProtocol = externalProtocol || protocolNumber;
      if (!formDataTmp || !activeProtocol) return;

      const fileContent = generateProtocolTemplate({
        formData: formDataTmp,
        protocolNumber: activeProtocol,
      });

      const blob = new Blob([fileContent], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `comprovante-${activeProtocol}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [formDataTmp, protocolNumber],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleResetFormState = useCallback(() => {
    reset();
    setProtocolNumber("");
    setFormDataTmp(null);
  }, [reset]);

  return {
    register,
    handleSubmit,
    errors,
    isModalOpen,
    formDataTmp,
    protocolNumber,
    handlePreSubmit,
    generateSnowflakeId,
    handleCloseModal,
    handleDownloadProtocol,
    handleResetFormState,
  };
}
