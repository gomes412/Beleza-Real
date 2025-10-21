"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function DuvidaLixar() {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

  const handleVoltar = () => {
    router.push("/cada7.1");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.profileLeft}>
          <img
            src="https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg"
            alt="Usuária"
            className={styles.logo}
          />
          <span className={styles.profileName}>{nomeUsuario || "Usuário"}</span>
        </div>

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Lixar unhas</h1>
        </div>
      </header>

      <div className={styles.textBox}>
        <h2>Para que serve:</h2>
        <p>
          Lixar as unhas vai deixar suas unhas mais bonitas e bem cuidadas, mas, 
          além disso, o ato de lixar é a chance de remover impurezas e células mortas 
          e de corrigir possíveis falhas de crescimento.

        </p>

        <h2>Como fazer:</h2>
        <p>
         Lixe as unhas na mesma direção, evitando o movimento “vai e vem”, 
         começando nas extremidades dos cantos ao centro de acordo com o 
         formato de sua preferência. As lixas utilizadas na ação devem ser 
         macias e delicadas, para que não haja agressão na saúde das unhas.
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={handleVoltar} className={styles.voltarButton}>
          Voltar
        </button>
      </div>
    </div>
  );
}
