import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginFormData } from "../schema";

export function useLoginForm() {
  const navigate = useNavigate(); // <-- Declarado aqui
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      // 🚧 Aqui vai entrar a função real do Supabase depois!
      console.log("Tentando logar com:", data);
      
      // Simulação de sucesso: redireciona para o dashboard
      navigate("/admin/dashboard"); // <-- Agora ele está sendo lido e usado!
      
    } catch (error) {
      setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    submitLogin: handleSubmit(handleLogin),
    errors,
    isLoading,
    errorMessage
  };
}