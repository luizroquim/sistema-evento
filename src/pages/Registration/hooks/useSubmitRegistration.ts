import { useState } from "react";
import { registrationService } from "../../../services/registrationService";
import { Registration } from "../../../@types/database";

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