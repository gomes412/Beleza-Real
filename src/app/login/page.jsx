// app/telaLogin/page.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Eye, EyeOff } from "lucide-react";
import AlertMessage from "@/app/login/pageComponents/AlertMessage";
import styles from "./login.module.css";

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
        setToast({
          type: "error",
          message: "Email ou senha incorretos."
        });
      } else {
        router.push(callbackUrl);
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

      <div className={styles.container}>
        <div className={`${styles.card} ${styles["login-card"]}`}>
          <h2 className={styles.titulo}>Login</h2>

          <button
            className={`${styles.button} ${styles["google-btn"]}`}
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Continuar com Google"}
          </button>

          <div className={styles.divisor}>ou</div>

          <form onSubmit={handleSubmit} className={styles.formulario}>
            <div className={styles["form-group"]}>
              <label htmlFor="email" className={styles["label-com-asterisco"]}>
                E-mail *
              </label>
              <div className={styles["input-icon-container"]}>
                <input
                  type="email"
                  id="email"
                  className={styles["input-field"]}
                  placeholder="Insira seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className={styles["input-icon"]}>
                  <Mail size={18} />
                </span>
              </div>
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="senha" className={styles["label-com-asterisco"]}>
                Senha *
              </label>
              <div className={styles["input-icon-container"]}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  className={styles["input-field"]}
                  placeholder="Insira sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <span
                  className={styles["input-icon"]}
                  onClick={togglePasswordVisibility}
                  role="button"
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            <div className={styles["button-group"]}>
              <button type="submit" className={styles.button} disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </div>

            <div className={styles["cadastro-link"]}>
              Não tem uma conta? <a href="/telaCadastro">Cadastre-se</a>
            </div>

            <div className={styles["forgot-password-link"]}>
              <a href="/esqueci-senha">Esqueci minha senha</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
