"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function duvidaempurrarcuticulas() {
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
          <h1 className={styles.title}>Empurrar cutículas</h1>
        </div>
      </header>

      <div className={styles.textBox}>
        <h2>Para que serve:</h2>
        <p>
          Previne infecções, mantém a hidratação, protege a matriz ungueal 
          (parte da unha que determina o seu crescimento) e evita a onicomicose.

        </p>

        <h2>Como fazer:</h2>
        <p>
        Aplique uma pequena quantidade do amolecedor de cutículas sobre 
        as cutículas limpas e secas. Aguarde o tempo indicado na embalagem do produto, 
        geralmente entre 2 a 5 minutos. Em seguida, utilize um empurrador de cutículas 
        para empurrar delicadamente a pele amolecida em direção à base da unha. Após 
        empurrar as cutículas, lave as mãos com água e sabão para remover o excesso 
        de produto e finalize com um hidratante específico para cutículas.
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
