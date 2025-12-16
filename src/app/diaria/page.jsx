"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function PageTodosDias() {
  const router = useRouter();
  const [nomeUsuario, setNomeUsuario] = useState("");

 
  const cuidadosPadrao = [
    "Lavar bem as mãos e pés",
    "Hidratar mãos e pés",
    "Proteção térmica ou ambiental: cabelo",
    "Hidratação leve: cabelo",
    "Massagem leve no couro cabeludo",
    "Hidratar a pele: rosto",
    "Proteção solar: corpo e rosto",
    "Aplicar sérum ou tratamento específico: rosto",
    "Aplicar creme de noite ou tratamento noturno: rosto",
    "Hidratação corporal: corpo"
  ];

  
  const [marcados, setMarcados] = useState(
    Array(cuidadosPadrao.length).fill(false)
  );

  const toggleCuidado = (index) => {
    const novoEstado = [...marcados];
    novoEstado[index] = !novoEstado[index];
    setMarcados(novoEstado);
  };

  
  useEffect(() => {
    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

 
  const dataAtual = "quarta-feira, 17 de dezembro de 2025";


  const irParaCiclo2 = () => {
    router.push("/ciclo2");
  };

  return (
    <div className={styles.container}>


      <header className={styles.header}>
        <div className={styles.profile}>
          <img
            src="/bonequinha.png"
            alt="Bonequinha"
            className={styles.logo}
            onError={(e) => {
              e.currentTarget.src =
                "https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg";
            }}
          />
          <span className={styles.profileName}>{nomeUsuario || "Usuário"}</span>
        </div>

        
        <button
          className={styles.cycleButton}
          onClick={irParaCiclo2}
          aria-label="Ir para Ciclo"
          title="Ciclo"
        >
      
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="12" r="11" stroke="none" fill="transparent" />
            <path
              d="M12 3c0 0-5 5.5-5 9.5A5 5 0 0 0 12 22a5 5 0 0 0 5-9.5C17 8.5 12 3 12 3z"
              fill="#d95c66"
            />
            <path
              d="M12 3s-3.2 3.6-3.2 6.8A3.2 3.2 0 1 0 12 3z"
              fill="#fff"
              opacity="0.08"
            />
          </svg>
        </button>
      </header>

    
      <div className={styles.dateCenter}>
        <p>{dataAtual}</p>
      </div>

    
      <section className={styles.listSection}>
        <ul className={styles.cuidadosList}>
          {cuidadosPadrao.map((item, idx) => (
            <li
              key={idx}
              className={styles.cuidadoItem}
              onClick={() => toggleCuidado(idx)}
            >
             
              <span
                className={styles.cuidadoBox}
                style={{
                  border: "2px solid #b0b0b0",
                  backgroundColor: marcados[idx] ? "#d87979" : "transparent",
                  cursor: "pointer"
                }}
              ></span>

              <span className={styles.cuidadoText}>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
