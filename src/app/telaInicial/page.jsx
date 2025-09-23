import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/cadastro" className={styles.link}>
        <div className={styles.content}>
          <img
            src="https://images.vexels.com/media/users/3/215769/isolated/lists/a5881bb5f5064d8d6a4f539936496097-desenho-de-linha-de-rosa-com-folha-unica.png"
            alt="Flor rosa"
            className={styles.flower}
          />
          <h1 className={styles.title}>Beleza Real</h1>
          <p className={styles.subtitle}>
            Organize sua rotina, realce sua essência!
          </p>
        </div>
      </Link>
    </div>
  );
}
