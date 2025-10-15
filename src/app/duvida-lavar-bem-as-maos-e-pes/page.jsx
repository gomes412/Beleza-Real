"use client";
import { useRouter } from "next/navigation";
import UsuarioInfo from "../../components/UsuarioInfo"; 
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
    router.push("/todoDia1");
  };

  return (
    <div className={styles.container}>
     
      <header className={styles.header}>
        <div className={styles.profileLeft}>
          <img
            src="https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg"
            alt="Usuaria"
            className={styles.logo}
          />
          <span className={styles.profileName}>{nomeUsuario || "Usuário"}</span>
        </div>

        <h1 className={styles.title}>Lavar Bem as Mãos e Pés?</h1>
      </header>

     
      <div className={styles.textBox}>
        <h2>Para que serve:</h2>
        <p>
          Em nossas mãos, podem acumular sujeiras, bactérias e fungos que acabam
          enfraquecendo as unhas. Dessa forma, é importante lavar as mãos e os
          pés com frequência e da forma correta para evitar a proliferação de
          doenças.
        </p>

        <h2>Como fazer:</h2>
        <p>
          <strong>Mãos:</strong> Molhe as mãos e aplique a quantidade de sabonete
          líquido suficiente para ensaboar toda a superfície. Após isso, esfregue
          as mãos de forma que alcance toda ela, incluindo entre os dedos e unhas.
        </p>
        <p>
          <strong>Pés:</strong> Esfregue suavemente os pés com bastante água
          corrente e sabonete. Dê atenção, principalmente, aos espaços entre os
          dedos para remover o suor e a sujeira. Faça o enxágue com água abundante,
          até remover o sabão.
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
