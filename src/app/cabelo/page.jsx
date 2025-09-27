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

        <div className={styles.icons}>
          <a href="/configuracoes">
            <img
              src="https://cdn-icons-png.flaticon.com/512/126/126472.png"
              alt="Configurações"
              className={styles.iconRound}
            />
          </a>
          <a href="/home">
            <img
              src="https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg"
              alt="Home"
              className={styles.iconRound}
            />
          </a>
        </div>
      </header>

    
      <main className={styles.main}>
        <a href="/todoDia2" className={styles.optionButton}>Todos os Dias</a>
        <a href="/cada7.2" className={styles.optionButton}>A cada 7 dias</a>
        <a href="/cada15.2" className={styles.optionButton}>A cada 15 dias</a>
        <a href="/cada30.2" className={styles.optionButton}>A cada 30 dias</a>
        <a href="/personalizar2" className={styles.optionButton}>Personalize a data</a>

        <a href="/calendario" className={styles.saveButton}>Salvar</a>
      </main>
    </div>
  );
}
