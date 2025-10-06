"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// Cuidados fixos
const cuidadosFixos = [
  "Esfoliação mais profunda",
  "Trocar lâmina de depilação",
  "Creme para estrias e celulites",
];

export default function Page15_3() {
  const router = useRouter();

  const [cuidados, setCuidados] = useState([]);
  const [nome, setNome] = useState("");
  const [adicionando, setAdicionando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  // Carregar do localStorage e garantir cuidados fixos
  useEffect(() => {
    const armazenados = localStorage.getItem("cuidados15dias3");
    let cuidadosSalvos = [];
    if (armazenados) {
      cuidadosSalvos = JSON.parse(armazenados);
    }

    // Garantir que os fixos estão presentes
    const cuidadosCompletos = cuidadosFixos.map((c) => {
      const achado = cuidadosSalvos.find((item) => item.nome === c);
      return achado ? achado : { nome: c, data: "" };
    });

    // Incluir cuidados adicionados que não são fixos
    const adicionais = cuidadosSalvos.filter(
      (item) => item.nome && !cuidadosFixos.includes(item.nome)
    );

    setCuidados([...cuidadosCompletos, ...adicionais]);

    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

  // Salvar sempre que mudar
  useEffect(() => {
    localStorage.setItem("cuidados15dias3", JSON.stringify(cuidados));
  }, [cuidados]);

  // Adicionar novo cuidado
  const handleAdicionar = (e) => {
    e.preventDefault();
    const v = nome.trim();
    if (!v) return;
    setCuidados((prev) => [...prev, { nome: v, data: "" }]);
    setNome("");
    setAdicionando(false);
  };

  // Excluir cuidado
  const handleExcluir = (index, e) => {
    if (e) e.stopPropagation();
    setCuidados((prev) => prev.filter((_, i) => i !== index));
    if (selecionado === index) setSelecionado(null);
  };

  // Alternar item selecionado
  const toggleSelecionado = (index) => {
    setSelecionado((s) => (s === index ? null : index));
  };

  // Abrir página de dúvida
  const irDuvida = (cuidado, e) => {
    if (e) e.stopPropagation();
    const caminho = `/duvida-${cuidado.toLowerCase().replace(/\s+/g, "-")}`;
    router.push(caminho);
  };

  // Alterar data do cuidado
  const handleDataChange = (index, value) => {
    setCuidados((prev) =>
      prev.map((item, i) => (i === index ? { ...item, data: value } : item))
    );
  };

  // Gerar próximas datas de 15 em 15 dias
  const gerarProximasDatas = (dataInicial) => {
    if (!dataInicial) return [];
    const datas = [];
    const inicio = new Date(dataInicial);
    for (let i = 0; i < 6; i++) {
      const nova = new Date(inicio);
      nova.setDate(inicio.getDate() + i * 15);
      datas.push(nova.toLocaleDateString("pt-BR"));
    }
    return datas;
  };

  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header className={styles.header}>
        <div className={styles.profile}>
          <img
            src="https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg"
            alt="Bonequinha"
            className={styles.logo}
          />
          <span className={styles.profileName}>{nomeUsuario || "Usuário"}</span>
        </div>

        <h1 className={styles.title}>A cada 15 dias</h1>

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

      {/* Lista de cuidados */}
      <section className={styles.listSection}>
        <ul className={styles.cuidadosList}>
          {cuidados
            .filter((item) => item.nome && item.nome.trim() !== "") // filtra vazios
            .map((item, idx) => (
              <li
                key={idx}
                className={styles.cuidadoItem}
                onClick={() => toggleSelecionado(idx)}
              >
                <div style={{ flex: 1 }}>
                  <span className={styles.cuidadoText}>{item.nome}</span>

                  {/* Campo de data */}
                  <div
                    style={{
                      marginTop: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <label style={{ fontSize: "0.95rem", color: "#b18b8b" }}>
                      Escolher data:
                    </label>
                    <input
                      type="date"
                      value={item.data || ""}
                      onChange={(e) => handleDataChange(idx, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        border: "1px solid #cbb",
                        fontFamily: "serif",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>

                  {/* Exibir próximas datas */}
                  {item.data && (
                    <div
                      style={{
                        marginTop: "6px",
                        fontFamily: "Kotta One, serif",
                        fontSize: "0.9rem",
                        color: "#333",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#b18b8b",
                          display: "block",
                          marginBottom: "2px",
                        }}
                      >
                        Próximas datas:
                      </span>
                      <ul style={{ marginLeft: "18px", marginTop: "2px" }}>
                        {gerarProximasDatas(item.data).map((data, i) => (
                          <li key={i}>{data}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className={styles.itemActions}>
                  <button
                    className={styles.duvidaBtn}
                    onClick={(e) => irDuvida(item.nome, e)}
                    aria-label={`Dúvida sobre ${item.nome}`}
                  >
                    ?
                  </button>

                  {selecionado === idx && (
                    <button
                      className={styles.excluirBtn}
                      onClick={(e) => handleExcluir(idx, e)}
                      aria-label={`Excluir ${item.nome}`}
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

      <Link href="/corpo" className={styles.salvarBtn}>
        Voltar
      </Link>
    </div>
  );
}
