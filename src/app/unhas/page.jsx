import React from "react";
import styles from "./page.module.css";

export default function Escolher() {
  return (
    <div className={styles.container}>
   
      <header className={styles.header}>
        <div className={styles.logo}>
          <img
            src="https://images.vexels.com/media/users/3/215769/isolated/lists/a5881bb5f5064d8d6a4f539936496097-desenho-de-linha-de-rosa-com-folha-unica.png"
            alt="Logo"
            className={styles.roseIcon}
          />
          <span className={styles.logoText}>BR</span>
        </div>


      </header>

      <main className={styles.main}>
        <a href="/todoDia1" className={styles.optionButton}>Todos os Dias</a>
        <a href="/cada7.1" className={styles.optionButton}>A cada 7 dias</a>
        <a href="/cada15.1" className={styles.optionButton}>A cada 15 dias</a>
        <a href="/cada30.1" className={styles.optionButton}>A cada 30 dias</a>
        <a href="/personalizar1" className={styles.optionButton}>Personalize a data</a>

        <a href="/calendario" className={styles.saveButton}>Voltar</a>
      </main>
    </div>
  );
}
