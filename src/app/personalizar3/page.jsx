"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";


const mesesData = [
  { nome: "Janeiro", img: "https://www.wikidates.org/br/2025/calendario-janeiro-2025-06.png" },
  { nome: "Fevereiro", img: "https://www.wikidates.org/br/2025/calendario-fevereiro-2025-06.png" },
  { nome: "Março", img: "https://www.wikidates.org/br/2025/calendario-marco-2025-06.png" },
  { nome: "Abril", img: "https://www.wikidates.org/br/2025/calendario-abril-2025-06.png" },
  { nome: "Maio", img: "https://www.wikidates.org/br/2025/calendario-maio-2025-06.png" },
  { nome: "Junho", img: "https://www.wikidates.org/br/2025/calendario-junho-2025-06.png" },
  { nome: "Julho", img: "https://www.wikidates.org/br/2025/calendario-julho-2025-06.png" },
  { nome: "Agosto", img: "https://www.wikidates.org/br/2025/calendario-agosto-2025-06.png" },
  { nome: "Setembro", img: "https://www.wikidates.org/br/2025/calendario-setembro-2025-06.png" },
  { nome: "Outubro", img: "https://www.wikidates.org/br/2025/calendario-outubro-2025-06.png" },
  { nome: "Novembro", img: "https://www.wikidates.org/br/2025/calendario-novembro-2025-06.png" },
  { nome: "Dezembro", img: "https://www.wikidates.org/br/2025/calendario-dezembro-2025-06.png" },
];


export default function PersonalizarUnhas() {
  const anoAtual = new Date().getFullYear();
  const [nomeUsuario, setNomeUsuario] = useState("");


  useEffect(() => {
    if (typeof window !== "undefined") {
      const nomeSalvo = localStorage.getItem("usuarioNome");
      if (nomeSalvo) setNomeUsuario(nomeSalvo);
    }
  }, []);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.leftHeader}>
          <img
            src="https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg"
            alt="Usuária"
            className={styles.userIcon}
          />
          <span className={styles.userName}>{nomeUsuario || "Usuário"}</span>
        </div>


        <div className={styles.centerHeader}>
          <img
            src="https://images.vexels.com/media/users/3/215769/isolated/lists/a5881bb5f5064d8d6a4f539936496097-desenho-de-linha-de-rosa-com-folha-unica.png"
            alt="Flor rosa"
            className={styles.flower}
          />
        </div>


        <div className={styles.rightHeader}>
          <Link href="/home" aria-label="Home">
            <img
              src="https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg"
              alt="Home"
              className={styles.iconImgRound}
            />
          </Link>
        </div>
      </header>


      <main>
        <h1 className={styles.title}>Personalize a data: selecione a data do seu cuidado</h1>
        <h3 className={styles.ano}>{anoAtual}</h3>


        <div className={styles.meses}>
          {mesesData.map((mes) => (
            <Link key={mes.nome} href={`/${mes.nome.toLowerCase()}`} className={styles.mesLink}>
              <img src={mes.img} alt={mes.nome} className={styles.mesImg} />
            </Link>
            
          ))}
        </div>
      </main>
    </div>
    
  );
}
