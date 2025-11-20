"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";


// 👉 APENAS OS DOIS CUIDADOS QUE VOCÊ PEDIU
const cuidadosDefault = [
  "Hidratação corporal",
  "Protetor solar corporal",
];

export default function TodoDia3() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [cuidados, setCuidados] = useState(cuidadosDefault);
  const [adicionando, setAdicionando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  // Carrega localStorage, mas se estiver vazio, usa apenas os dois cuidados
  useEffect(() => {
    const armazenados = localStorage.getItem("cuidadosTodoDia3");

    if (armazenados) {
      const lista = JSON.parse(armazenados);

      // Caso a lista salva ainda tenha os cuidados antigos → substitui pelos novos
      if (Array.isArray(lista) && lista.length > 0) {
        const contemAntigos = lista.some(
          item =>
            item.toLowerCase().includes("lavar") ||
            item.toLowerCase().includes("hidratante") ||
            item.toLowerCase().includes("protetor solar nas áreas")
        );

        if (contemAntigos) {
          setCuidados(cuidadosDefault);
          localStorage.setItem("cuidadosTodoDia3", JSON.stringify(cuidadosDefault));
        } else {
          setCuidados(lista);
        }
      }
    }

    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

  // Salvar automaticamente
  useEffect(() => {
    localStorage.setItem("cuidadosTodoDia3", JSON.stringify(cuidados));
  }, [cuidados]);

  const handleAdicionar = (e) => {
    e.preventDefault();
    const v = nome.trim();
    if (!v) return;

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

  const irDuvida = (item, e) => {
    if (e) e.stopPropagation();

    const rota = item
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");

    router.push(`/duvida-${rota}`);
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
          >
            +
          </button>
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
                >
                  ?
                </button>

                {selecionado === idx && (
                  <button
                    className={styles.excluirBtn}
                    onClick={(e) => handleExcluir(idx, e)}
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

      <Link href="/corpo" className={styles.salvarBtn}>
        Voltar
      </Link>
    </div>
  );
}
