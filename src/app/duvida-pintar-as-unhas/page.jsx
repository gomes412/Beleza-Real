"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function DuvidaPintar() {
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
          <h1 className={styles.title}>Pintar as unhas</h1>
        </div>
      </header>

      <div className={styles.textBox}>
        <h2>Para que serve:</h2>
        <p>
          É um ritual de autocuidado que pode aumentar a autoestima e proteger a unha contra danos.
        </p>
        <h2>Como fazer:</h2>
        <p>
        Após aplicar a base fortalecedora, pinte as unhas com camadas finas e uniformes 
        de esmalte, intercalando com um intervalo para secagem. Use um palito para 
        limpar o excesso de esmalte nas bordas entre as camadas. Ao final, remova os 
        borrados com um algodão com removedor de esmalte e finalize com top coat.
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
