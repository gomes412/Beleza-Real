"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

const PersonalizarUnhas = () => {
  const anoAtual = new Date().getFullYear();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.user}>
          <span className={styles.userIcon}>👤</span>
          <span className={styles.userName}>Anne Karine</span>
        </div>

        <div className={styles.icons}>
          <Link href="/home">
            <button className={styles.iconBtn}>🏠</button>
          </Link>
          <Link href="/configuracoes">
            <button className={styles.iconBtn}>⚙️</button>
          </Link>
        </div>
      </header>

      {/* Flor */}
      <div className={styles.imageContainer}>
        <img
          src="https://images.vexels.com/media/users/3/215769/isolated/lists/a5881bb5f5064d8d6a4f539936496097-desenho-de-linha-de-rosa-com-folha-unica.png"
          alt="Flor rosa"
          className={styles.flower}
        />
      </div>

      {/* Título maior */}
      <h1 className={styles.title}>
        Personalize a data: selecione a data do seu cuidado
      </h1>

      {/* Ano dinâmico */}
      <h3 className={styles.ano}>{anoAtual}</h3>

      {/* Calendário de meses */}
      <div className={styles.meses}>
        {[
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ].map((mes, index) => (
          <Link key={index} href={`/${mes.toLowerCase()}`}>
            <button className={styles.mesBtn}>{mes}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PersonalizarUnhas;
