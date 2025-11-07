"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function DuvidaLavarBemAsMaosEPes() {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

  const handleVoltar = () => {
    router.push("/todoDia2");
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
          <h1 className={styles.title}>Proteção térmica ou ambiental?</h1>
        </div>
      </header>

      <div className={styles.textBox}>
        <h2>Para que serve:</h2>
        <p>
          Manter os fios hidratados impede que fiquem opacos, 
          quebradiços ou com pontas duplas.
        </p>

        <h2>Como fazer:</h2>
        <p>
          Use um spray ou leave-in ou óleo reparador de pontas adequado para o seu tipo 
          de cabelo (por ex., com aminoácidos, pantenol). Aplique nas pontas ou ao 
          longo dos fios antes de dormir ou ao sair.

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
