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
  const [mensagem, setMensagem] = useState("");
  const [cuidados, setCuidados] = useState(cuidadosDefault);
  const [adicionando, setAdicionando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  // Carregar lista do localStorage e nome do usuário
  useEffect(() => {
    const armazenados = localStorage.getItem("cuidadosDiarios");
    if (armazenados) {
      setCuidados(JSON.parse(armazenados));
    }

    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

  // Salvar lista no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("cuidadosDiarios", JSON.stringify(cuidados));
  }, [cuidados]);

  const handleAdicionar = (e) => {
    e.preventDefault();
    const v = nome.trim();
    if (!v) return;
    setCuidados((p) => [...p, v]);
    setNome("");
    setAdicionando(false);
    setMensagem("Cuidado adicionado com sucesso!");
  };

  const handleExcluir = (index, e) => {
    if (e) e.stopPropagation();
    setCuidados((p) => p.filter((_, i) => i !== index));
    if (selecionado === index) setSelecionado(null);
  };

  const toggleSelecionado = (index) => {
    setSelecionado((s) => (s === index ? null : index));
  };

  // Redireciona para página de dúvida específica (sem acentos)
  const irDuvida = (cuidado, e) => {
    if (e) e.stopPropagation();

    // Normaliza removendo acentos e caracteres especiais
    const normalizado = cuidado
      .toLowerCase()
      .normalize("NFD") // separa letras e acentos
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^\w\s-]/g, "") // remove outros símbolos
      .replace(/\s+/g, "-"); // troca espaços por hífens

    const caminho = `/duvida-${normalizado}`;
    router.push(caminho);
  };

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
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

          <Link
            href="/home"
            className={styles.homeLink}
            aria-label="Home"
            title="Home"
          >
            <img
              src="https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg"
              alt="Home"
              className={styles.iconRound}
            />
          </Link>
        </div>
      </header>

      {/* Lista de cuidados */}
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

        {/* Adicionar novo cuidado */}
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

      {/* Botão voltar */}
      <Link href="/unhas" className={styles.salvarBtn}>
        Voltar
      </Link>
    </div>
  );
}
