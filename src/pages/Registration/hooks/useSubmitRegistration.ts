import { useState } from "react";
import { registrationService } from "../../../services/registrationService";
import { Registration } from "../../../@types/database";
import { supabase } from "../../../config/supabase";

export function useSubmitRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successProtocol, setSuccessProtocol] = useState<string | null>(null);

  const registerCandidate = async (
    candidateData: Omit<Registration, "protocol_number" | "file_path">,
    file: File | null,
    customProtocol?: string,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!file) {
        throw new Error(
          "O arquivo do regulamento/projeto em PDF é obrigatório.",
        );
      }

      console.log("CPF enviado pelo formulário:", candidateData.document);

      // 1. Usando .ilike com % para capturar o dado mesmo com espaços fantasmas no banco
      const { data: existingCandidates, error: checkError } = await supabase
        .from("registrations")
        .select("id")
        .ilike("document", `%${candidateData.document.trim()}%`);

      if (checkError) {
        console.error("Erro na consulta do Supabase:", checkError);
        throw new Error("Erro ao verificar a existência do CPF.");
      }

      console.log("Retorno real do banco:", existingCandidates);

      // 2. Se a lista contiver qualquer registro, bloqueia na hora
      if (existingCandidates && existingCandidates.length > 0) {
        throw new Error("Este CPF já está inscrito no concurso.");
      }

      // 3. FLUXO NORMAL
      const generatedProtocol = customProtocol || String(Date.now());
      const fileExtension = file.name.split(".").pop();
      const fileName = `${generatedProtocol}.${fileExtension}`;

      const uploadedPath = await registrationService.uploadDocument(
        file,
        fileName,
      );

      const completeData: Registration = {
        ...candidateData,
        protocol_number: generatedProtocol,
        file_path: uploadedPath,
      };

      await registrationService.create(completeData);
      setSuccessProtocol(generatedProtocol);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao processar sua inscrição.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetSubmission = () => {
    setSuccessProtocol(null);
    setError(null);
  };

  return {
    registerCandidate,
    isLoading,
    error,
    successProtocol,
    resetSubmission,
  };
}
