"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();


 
   const handleSubmit = async (e) => {
    e.preventDefault();


    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }


    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, senha}),
    })
    const usuario = response.json();
    if (!usuario) {
      setErro("usária não existe ou senha inválida!");
      return;
    }
    localStorage.setItem("usuarioNome", usuario.nome);
    alert(`Bem-vinda de volta, ${usuario.nome}!`);
    router.push("/calendario");
  };


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img
            src="https://images.vexels.com/media/users/3/215769/isolated/lists/a5881bb5f5064d8d6a4f539936496097-desenho-de-linha-de-rosa-com-folha-unica.png"
            alt="Flor rosa"
            className={styles.flower}
          />
          <h1 className={styles.title}>Beleza Real</h1>
          <p className={styles.subtitle}>
            Organize sua rotina, realce sua essência!
          </p>
        </div>


        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
          />


          {erro && <p className={styles.error}>{erro}</p>}


          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>


        <p className={styles.forgot}>
          <a href="/senha">Esqueceu a senha?</a>
        </p>
      </div>
    </div>
  );
}
