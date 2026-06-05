import { RegistrationFormData } from '../schema';

interface TemplateData {
  formData: RegistrationFormData;
  protocolNumber: string;
}

export function generateProtocolTemplate({ formData, protocolNumber }: TemplateData): string {
  return `==================================================
COMPROVANTE DE RECEBIMENTO DE DOCUMENTAÇÃO
==================================================

Protocolo: ${protocolNumber}
Data de Envio: ${new Date().toLocaleDateString('pt-BR')}

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