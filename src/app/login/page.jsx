// app/telaLogin/page.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Eye, EyeOff } from "lucide-react";
import AlertMessage from "@/app/login/pageComponents/AlertMessage";
import "./login.module.css";

export default function PaginaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/calendario";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setToast(null);

    try {
      const resultado = await signIn("credentials", {
        email,
        senha,
        redirect: false,
        callbackUrl,
      });

      if (resultado?.error) {
        // o NextAuth normalmente devolve mensagem em resultado.error
        setToast({
          type: "error",
          message:
            "Não foi possível realizar o login (credenciais incorretas ou usuário não cadastrado).",
        });
      } else if (resultado?.ok) {
        setToast({ type: "success", message: "Login realizado com sucesso!" });
        // redireciona para callbackUrl (depois de mostrar toast)
        setTimeout(() => router.push(callbackUrl), 700);
      }

      setEmail("");
      setSenha("");
    } catch (error) {
      console.error("Erro handleSubmit:", error);
      setToast({
        type: "error",
        message: "Erro ao tentar fazer login. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setToast(null);

    try {
      // redirecionamento direto para o provider (NextAuth tratará callback)
      await signIn("google", {
        callbackUrl: `${window.location.origin}${callbackUrl}`,
      });
    } catch (error) {
      console.error("Erro Google signIn:", error);
      setToast({
        type: "error",
        message: "Erro ao tentar fazer login com Google.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((s) => !s);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sansation:wght@300;400;700&family=Urbanist:wght@100..900&display=swap"
        rel="stylesheet"
      />

      {toast && (
        <AlertMessage
          type={toast.type}
          message={toast.message}
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}

      <div className="container">
        <div className="card login-card">
          <h2 className="titulo">Login</h2>

          <button
            className="button google-btn"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Continuar com Google"}
          </button>

          <div className="divisor">ou</div>

          <form onSubmit={handleSubmit} className="formulario">
            <div className="form-group">
              <label htmlFor="email" className="label-com-asterisco">
                E-mail *
              </label>
              <div className="input-icon-container">
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="Insira seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="input-icon">
                  <Mail size={18} />
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="senha" className="label-com-asterisco">
                Senha *
              </label>
              <div className="input-icon-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  className="input-field"
                  placeholder="Insira sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <span
                  className="input-icon"
                  onClick={togglePasswordVisibility}
                  role="button"
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="button" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </div>

            <div className="cadastro-link">
              Não tem uma conta? <a href="/telaCadastro">Cadastre-se</a>
            </div>

            <div className="forgot-password-link">
              <a href="/esqueci-senha">Esqueci minha senha</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
