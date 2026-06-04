import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema, RegistrationFormData } from '../schema';

export function useRegistrationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDataTmp, setFormDataTmp] = useState<RegistrationFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: 'onTouched'
  });

  const handlePreSubmit = useCallback((data: RegistrationFormData) => {
    setFormDataTmp(data);
    setIsModalOpen(true);
  }, []);

  const handleFinalConfirm = useCallback(async () => {
    setIsModalOpen(false);
    setIsSubmitting(true);

    try {
      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      alert(`Inscrição de ${formDataTmp?.fullName} realizada com sucesso!`);
      
      reset();
      setFormDataTmp(null);
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formDataTmp, reset]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

 
  return {
    register,
    handleSubmit,
    errors,
    isModalOpen,
    isSubmitting,
    formDataTmp,
    handlePreSubmit,
    handleFinalConfirm,
    handleCloseModal
  };
}