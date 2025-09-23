"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");


  const router = useRouter();


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos para criar a conta!");
      return;
    }


    setErro("");
    alert(`Conta criada com sucesso!\nBem-vinda, ${nome}!`);
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
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input}
          />
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
            Criar conta
          </button>
        </form>


        <p className={styles.link}>
          Já é usuário? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
}
