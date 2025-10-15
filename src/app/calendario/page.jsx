"use client";
import React, { useEffect, useState } from "react";
import styles from "./calendario.module.css";

export default function Personalize() {
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
   
    const nome = localStorage.getItem("usuarioNome");
    if (nome) setNomeUsuario(nome);
  }, []);

  return (
    <div className={styles.container}>
    
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <img
            src="https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg"
            alt="Ícone Usuário"
            className={styles.userIcon}
          />
          <span className={styles.userName}>{nomeUsuario || "Usuário"}</span>
        </div>

        <div className={styles.headerIcons}>
        </div>
      </header>

     
      <h2 className={styles.title}>Personalize seu Cronograma</h2>

    
      <div className={styles.grid}>
       
        <div className={styles.leftColumn}>
          <a href="/unhas" className={styles.card}>
            <img src="https://i.pinimg.com/736x/e5/45/06/e545066514246f2c204d9b3ecf304af8.jpg" alt="Unhas" />
            <span>Unhas</span>
          </a>

          <a href="/cabelo" className={styles.card}>
            <img src="https://i.pinimg.com/736x/9d/f2/32/9df2324151f8d2446f56304427ca7c48.jpg" alt="Cabelo" />
            <span>Cabelo</span>
          </a>

          <a href="/corpo" className={styles.card}>
            <img src="https://plus.unsplash.com/premium_vector-1721635430958-5809aaf5dae3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Pele" />
            <span>Corpo</span>
          </a>

          <a href="/rosto" className={styles.card}>
            <img src="https://i.pinimg.com/736x/56/f8/ad/56f8ada8f447bc41d0e65e678ceb0a15.jpg" alt="Rosto" />
            <span>Rosto</span>
          </a>
        </div>

  
        <div className={styles.rightColumn}>
          <a href="/saude" className={styles.card}>
            <img src="https://i.pinimg.com/236x/c8/2d/78/c82d782a1c9225e1cb739f0762d6f288.jpg" alt="Saúde" />
            <span>Saúde</span>
          </a>

          <a href="/ciclo-menstrual" className={styles.card}>
            <img src="https://img.genial.ly/5db8b6ab91b0ad0faee274cd/43374944-522a-47be-a8fe-02a6dc99b5e8.png" alt="Ciclo Menstrual" />
            <span>Ciclo Menstrual</span>
          </a>

          <a href="/cilios-sobrancelhas" className={styles.card}>
            <img src="https://i.pinimg.com/736x/fd/68/22/fd6822c031928df430324e66340718a6.jpg" alt="Cílios e sobrancelhas" />
            <span>Cílios e Sobrancelhas</span>
          </a>
        </div>
      </div>

   
      <a href="/diaria" className={styles.saveButton}>
        Salvar Cronogramas
      </a>
    </div>
  );
}
