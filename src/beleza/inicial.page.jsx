import styles from "./inicial.page.module.css";

export default function Page() {
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Beleza Real</h1>
      <p className={styles.subtitle}>
        Organize sua rotina, realce sua essência!
      </p>
    </div>
  );
}