"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function DuvidaCortar() {
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
          <h1 className={styles.title}>Cortar Unhas</h1>
        </div>
      </header>

      <div className={styles.textBox}>
        <h2>Para que serve:</h2>
        <p>
          Unhas grandes geram mau odor, micose e ficam mais propensas a encravar, 
          portanto o ideal é que, uma vez por semana, você as corte.
        </p>

        <h2>Como fazer:</h2>
        <p>
         Corte-as com uma tesourinha própria para as unhas. 
         E, nas unhas dos pés, evite cortar as laterais em formato arredondado, 
         pois pode gerar o encravamento das unhas, portanto busque cortá-las em formato reto.
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
