"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function DuvidausarBaseFortalecedora() {
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
          <h1 className={styles.title}>Usar base fortalecedora</h1>
        </div>
      </header>

      <div className={styles.textBox}>
        <h2>Para que serve:</h2>
        <p>
          É um produto especialmente formulado para proteger e fortalecer as unhas, agindo como uma camada de tratamento.

        </p>

        <h2>Como fazer:</h2>
        <p>
         Após remover o esmalte (caso esteja com algum) e fazer a cuticulagem, 
         aplique a base fortalecedora.
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
