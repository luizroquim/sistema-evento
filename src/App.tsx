import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import { GlobalStyle } from './styles/globalStyles';

// Importando as Páginas (Públicas e Admin)
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Admin/Login";
import { AdminDashboard } from "./pages/Admin/Dashboard";
import { AdminEvaluation } from "./pages/Admin/Evaluation";
import { ForgotPassword } from "./pages/Admin/ForgotPassword";
import { ResetPassword } from "./pages/Admin/ResetPassword";
import { Evaluators } from "./pages/Admin/Evaluators";
import { CriteriaManagement } from "./pages/Admin/CriteriaManagement";


// Importando as Páginas da Banca (Jury)
import { JuryDashboard } from "./pages/Jury/Dashboard";
import { JuryAssessment } from "./pages/Jury/Assessment";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle /> 
      
      <BrowserRouter>
        <Routes>
          {/* Porta da Frente (Pública - Candidatos) */}
          <Route path="/" element={<Registration />} />

          {/* MUNDO 1: O Gestor (Admin) */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/evaluation/:id" element={<AdminEvaluation />} />
          <Route path="/admin/recuperar-senha" element={<ForgotPassword />} />
          <Route path="/admin/nova-senha" element={<ResetPassword />} />
          <Route path="/admin/avaliadores" element={<Evaluators />} />
          <Route path="/admin/criteria" element={<CriteriaManagement />} />

          {/* MUNDO 2: A Banca Examinadora (Jury) */}
          <Route path="/jury/dashboard" element={<JuryDashboard />} />
          <Route path="/jury/assessment/:id" element={<JuryAssessment />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}