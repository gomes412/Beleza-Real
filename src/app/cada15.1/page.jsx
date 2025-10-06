"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const cuidadosDefault = [
  { nome: "Fazer manicure e pedicure completos", data: "" },
  { nome: "Esfoliar pés e mãos", data: "" },
  { nome: "Aplicar óleo de amêndoas", data: "" },
];

export default function Page15() {
  const router = useRouter();

  const [cuidados, setCuidados] = useState(cuidadosDefault);
  const [nome, setNome] = useState("");
  const [adicionando, setAdicionando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const armazenados = localStorage.getItem("cuidados15dias");
    if (armazenados) setCuidados(JSON.parse(armazenados));

    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);
  }, []);


  useEffect(() => {
    localStorage.setItem("cuidados15dias", JSON.stringify(cuidados));
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
    const atualizados = [...cuidados];
    atualizados[index].data = value;
    setCuidados(atualizados);
  };

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

      <section className={styles.listSection}>
        <ul className={styles.cuidadosList}>
          {cuidados.map((item, idx) => (
            <li
              key={idx}
              className={styles.cuidadoItem}
              onClick={() => toggleSelecionado(idx)}
            >
              <div className={styles.cuidadoInfo}>
                <span className={styles.cuidadoText}>{item.nome}</span>

                <div className={styles.dataContainer}>
                  <label className={styles.dataLabel}>Escolher data:</label>
                  <input
                    type="date"
                    className={styles.dataInput}
                    value={item.data || ""}
                    onChange={(e) => handleDataChange(idx, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {item.data && (
                  <div className={styles.datasList}>
                    <span className={styles.datasTitulo}>Próximas datas:</span>
                    <ul>
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
