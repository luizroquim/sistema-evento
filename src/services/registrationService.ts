import { supabase } from "../config/supabase";
import { Registration } from "../@types/database";

export const registrationService = {
  // Salva os dados textuais do aluno na tabela registrations
  async create(data: Registration) {
    const { data: response, error } = await supabase
      .from("registrations")
      .insert([data]);

    if (error) throw new Error(error.message);
    return response;
  },

  // Sobe o PDF do aluno para o bucket privado concurso-documentos
  async uploadDocument(file: File, fileName: string) {
    const { data, error } = await supabase.storage
      .from("concurso-documentos")
      .upload(fileName, file);

    if (error) throw new Error(error.message);
    return data.path;
  },

  
  async checkExistingCPF(cpf: string): Promise<boolean> {
    const cleanCPF = cpf.replace(/\D/g, ""); 
    const { data, error } = await supabase
      .from("registrations")
      .select("id")
      .eq("document", cleanCPF);

    if (error) {
      console.error("Erro ao checar CPF no banco:", error);
      return false; 
    }

    
    return data && data.length > 0;
  },
};