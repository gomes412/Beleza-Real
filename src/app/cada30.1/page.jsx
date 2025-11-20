"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const cuidadosFixos = ["Pausa do Esmalte"];

export default function Page30() {
  const router = useRouter();

  const [cuidados, setCuidados] = useState([]);
  const [nome, setNome] = useState("");
  const [adicionando, setAdicionando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

 
  useEffect(() => {
    const cuidadoUnico = [{ nome: "Pausa do Esmalte", data: "" }];

    setCuidados(cuidadoUnico);
    localStorage.setItem("cuidados30dias", JSON.stringify(cuidadoUnico));

    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);

  useEffect(() => {
    localStorage.setItem("cuidados30dias", JSON.stringify(cuidados));
  }, [cuidados]);

  const handleAdicionar = (e) => {
    e.preventDefault();
    const v = nome.trim();
    if (!v) return;
    setCuidados((prev) => [...prev, { nome: v, data: "" }]);
    setNome("");
    setAdicionando(false);
  };

  const handleExcluir = (index, e) => {
    if (e) e.stopPropagation();
    setCuidados((prev) => prev.filter((_, i) => i !== index));
    if (selecionado === index) setSelecionado(null);
  };

  const toggleSelecionado = (index) => {
    setSelecionado((s) => (s === index ? null : index));
  };

  const irDuvida = (cuidado, e) => {
    if (e) e.stopPropagation();
    const caminho = `/duvida-${cuidado.toLowerCase().replace(/\s+/g, "-")}`;
    router.push(caminho);
  };

  const handleDataChange = (index, value) => {
    setCuidados((prev) =>
      prev.map((item, i) => (i === index ? { ...item, data: value } : item))
    );
  };

  const gerarProximasDatas = (dataInicial) => {
    if (!dataInicial) return [];
    const datas = [];
    const inicio = new Date(dataInicial);
    for (let i = 0; i < 6; i++) {
      const nova = new Date(inicio);
      nova.setDate(inicio.getDate() + i * 30);
      datas.push(nova.toLocaleDateString("pt-BR"));
    }
    return datas;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.profile}>
          <img
            src="https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg"
            alt="Bonequinha"
            className={styles.logo}
          />
          <span className={styles.profileName}>{nomeUsuario || "Usuário"}</span>
        </div>

        <h1 className={styles.title}>A cada 30 dias</h1>

        <div className={styles.rightHeader}>
          <button
            className={styles.addBtn}
            onClick={() => setAdicionando(true)}
            aria-label="Adicionar cuidado"
            title="Adicionar"
          >
            +
          </button>

         
        </div>
      </header>

      <section className={styles.listSection}>
        <ul className={styles.cuidadosList}>
          {cuidados
            .filter((item) => item.nome && item.nome.trim() !== "")
            .map((item, idx) => (
              <li
                key={idx}
                className={styles.cuidadoItem}
                onClick={() => toggleSelecionado(idx)}
              >
                <div style={{ flex: 1 }}>
                  <span className={styles.cuidadoText}>{item.nome}</span>

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
