import { RegistrationFormData } from '../schema';

interface TemplateData {
  formData: RegistrationFormData;
  protocolNumber: string;
}

export function generateProtocolTemplate({ formData, protocolNumber }: TemplateData): string {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR');
  const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return `==================================================
COMPROVANTE DE RECEBIMENTO DE DOCUMENTAÇÃO
==================================================

Protocolo: ${protocolNumber}
Data de Envio: ${formattedDate} às ${formattedTime}

--------------------------------------------------
DADOS DO CANDIDATO:
--------------------------------------------------
Nº de Inscrição/Pagamento: ${formData.paymentNumber}
Nome Completo: ${formData.fullName}
CPF: ${formData.document}
E-mail: ${formData.email}
Telefone: ${formData.phone}

--------------------------------------------------
INFORMAÇÕES IMPORTANTES:
--------------------------------------------------
Uma confirmação detalhada foi enviada para o e-mail:
${formData.email}

Guarde este arquivo de texto como seu comprovante oficial.
Obrigado!
==================================================`;
}