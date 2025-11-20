"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const cuidadosDefault = [
  "Esfoliação",
  "Depilação",
  "Hidratante com óleo",
  "Massagem corporal",
];


const diasSemana = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
];

export default function Page() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [cuidados, setCuidados] = useState(cuidadosDefault);
  const [adicionando, setAdicionando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [diaSelecionado, setDiaSelecionado] = useState("");  

  useEffect(() => {
    const armazenados = localStorage.getItem("cuidados7dias3");
    if (armazenados) {
      setCuidados(JSON.parse(armazenados));
    }

    const nomeSalvo = localStorage.getItem("usuarioNome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);

    const diaSalvo = localStorage.getItem("diaSelecionado");
    if (diaSalvo) setDiaSelecionado(diaSalvo); 
  }, []);

  useEffect(() => {
    localStorage.setItem("cuidados7dias3", JSON.stringify(cuidados));
    if (diaSelecionado) {
      localStorage.setItem("diaSelecionado", diaSelecionado);  
    }
  }, [cuidados, diaSelecionado]);

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

  
  const selecionarDia = (dia) => {
    setDiaSelecionado(dia); 
  };

  const irDuvida = (item, e) => {
    if (e) e.stopPropagation();
    router.push(`/duvida-${item.toLowerCase().replace(/\s+/g, "-")}`);
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

        <h1 className={styles.title}>A cada 7 dias</h1>

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

      <section className={styles.diaSemanaSection}>
        <div className={styles.diaSemanaText}>
          Selecione qual será o dia da semana em que esse cuidado ocorrerá:
        </div>

        <div className={styles.diaSemanaButtons}>
          {diasSemana.map((dia, index) => (
            <button
              key={index}
              className={`${styles.diaBtn} ${diaSelecionado === dia ? styles.diaSelecionado : ''}`}
              onClick={() => selecionarDia(dia)}
            >
              {dia}
            </button>
          ))}
        </div>
      </section>

      <Link href="/corpo" className={styles.salvarBtn}>
        Voltar
      </Link>
    </div>
  );
}
