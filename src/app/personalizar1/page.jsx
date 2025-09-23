import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Personalizar1Page() {
  const anoAtual = new Date().getFullYear();

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="https://images.vexels.com/media/users/3/215769/isolated/lists/a5881bb5f5064d8d6a4f539936496097-desenho-de-linha-de-rosa-com-folha-unica.png"
            alt="Logo BR"
            width={40}
            height={40}
          />
          <span className={styles.brand}>BR</span>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navButton}>
            Home
          </Link>
          <Link href="/config" className={styles.navButton}>
            Configurações
          </Link>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Usuário"
            width={35}
            height={35}
          />
        </nav>
      </header>

      {/* Conteúdo */}
      <h1 className={styles.title}>
        Personalize a data: selecione a data do seu cuidado
      </h1>
      <h2 className={styles.year}>{anoAtual}</h2>

      {/* Grade de meses */}
      <div className={styles.monthsGrid}>
        <Link
          href="https://png.pngtree.com/png-clipart/20240219/original/pngtree-2025-january-portuguese-monthly-calendar-vector-png-image_14355147.png"
          target="_blank"
          className={styles.monthCard}
        >
          <Image
            src="https://png.pngtree.com/png-clipart/20240219/original/pngtree-2025-january-portuguese-monthly-calendar-vector-png-image_14355147.png"
            alt="Janeiro 2025"
            width={200}
            height={200}
            className={styles.monthImage}
          />
          <span className={styles.monthName}>Janeiro</span>
        </Link>
      </div>
    </div>
  );
}
