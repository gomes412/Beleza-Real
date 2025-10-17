"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const cuidadosDefault = [
  "Lavar Bem as Mãos e Pés",
  "Hidratante Para Mãos e Pés",
];

export default function PageTodosDias() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [cuidados, setCuidados] = useState([]);
  const [adicionando, setAdicionando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  // Carrega dados ao iniciar
  useEffect(() => {
    const armazenados = localStorage.getItem("cuidadosDiarios");
    if (armazenados) {
      const cuidadosSalvos = JSON.parse(armazenados);
      // Junta os fixos e os salvos (sem duplicar)
      const combinados = [...new Set([...cuidadosSalvos, ...cuidadosDefault])];
      setCuidados(combinados);
    } else {
      setCuidados(cuidadosDefault);
    }

    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("cuidadosDiarios", JSON.stringify(cuidados));
  }, [cuidados]);

  
  const handleAdicionar = (e) => {
    e.preventDefault();
    const v = nome.trim();
    if (!v || cuidados.includes(v)) return;
    setCuidados((p) => [...p, v]);
    setNome("");
    setAdicionando(false);
  };


  const handleExcluir = (index, e) => {
    if (e) e.stopPropagation();
    setCuidados((p) => p.filter((_, i) => i !== index));
    if (selecionado === index) setSelecionado(null);
  };

  const toggleSelecionado = (index) => {
    setSelecionado((s) => (s === index ? null : index));
  };


  const irDuvida = (cuidado, e) => {
    if (e) e.stopPropagation();

    const normalizado = cuidado
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const caminho = `/duvida-${normalizado}`;
    router.push(caminho);
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

        <h1 className={styles.title}>Todos os Dias</h1>

        <div className={styles.rightHeader}>
          <button
            className={styles.addBtn}
            onClick={() => setAdicionando(true)}
            aria-label="Adicionar cuidado"
            title="Adicionar"
          >
            +
          </button>

          <Link href="/home" className={styles.homeLink} aria-label="Home" title="Home">
            <img
              src="https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg"
              alt="Home"
              className={styles.iconRound}
            />
          </Link>
        </div>
      </header>

      <section className={styles.listSection}>
        <ul className={styles.cuidadosList}>
          {cuidados.map((item, idx) => (
            <li
              key={idx}
              className={styles.cuidadoItem}
              onClick={() => toggleSelecionado(idx)}
            >
              <span className={styles.cuidadoText}>{item}</span>

              <div className={styles.itemActions}>
                <button
                  className={styles.duvidaBtn}
                  onClick={(e) => irDuvida(item, e)}
                  aria-label={`Dúvida sobre ${item}`}
                >
                  ?
                </button>

                {selecionado === idx && (
                  <button
                    className={styles.excluirBtn}
                    onClick={(e) => handleExcluir(idx, e)}
                    aria-label={`Excluir ${item}`}
                  >
                    Excluir
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

  
        {adicionando && (
          <div className={styles.addSection}>
            <input
              className={styles.input}
              placeholder="Novo cuidado"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <button className={styles.confirmAddBtn} onClick={handleAdicionar}>
              Adicionar
            </button>
            <button
              className={styles.cancelAddBtn}
              onClick={() => {
                setAdicionando(false);
                setNome("");
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </section>

     
      <Link href="/unhas" className={styles.salvarBtn}>
        Voltar
      </Link>
    </div>
  );
}
