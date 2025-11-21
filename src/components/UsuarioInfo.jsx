/*"use client";
import { useEffect, useState } from "react";
import styles from "./UsuarioInfo.module.css";

export default function UsuarioInfo() {
  const [nome, setNome] = useState("");

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      setNome(usuario.nome);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioNome");
    window.location.href = "/login"; // redireciona pro login
  };

  return (
    <div className={styles.user}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
        alt="Usuária"
        className={styles.icon}
      />
      <span className={styles.nome}>{nome || "Usuária"}</span>
      <button onClick={handleLogout} className={styles.logout}>
        Sair
      </button>
    </div>
  );
}*/