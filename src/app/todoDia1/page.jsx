"use client";


import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";


const cuidadosDefault = [
  "...",
  "...",
  "...",
  "...",
  "...",
  "..."
];


export default function Page() {
  const router = useRouter();
  
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [cuidados, setCuidados] = useState(cuidadosDefault);
  const [novoCuidado, setNovoCuidado] = useState("");
  const [adicionando, setAdicionando] = useState(false);
  const [selecionado, setSelecionado] = useState(null);


  /*const handleAdicionar = () => {
    const v = novoCuidado.trim();
    if (!v) return;
    setCuidados((p) => [...p, v]);
    setNovoCuidado("");
    setAdicionando(false);
  };*/

  const handleAdicionar = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    formData.append('nome', nome);

      try {
          const res = await fetch('/api/procedimento', {
              method: 'POST',
              body: formData,
          });

          if (res.ok) {
              const procedimento = await res.json();
              setMensagem('Procedimento cadastrado com sucesso!');
              setCuidados((p) => [...p, procedimento.nome]); // <-- adiciona na lista
              setNome("");
              setAdicionando(false);
          } else {
              const err = await res.json();
              setMensagem(`Erro: ${err.error || 'Não foi possível adicionar.'}`);
          }
      } catch (error) {
          console.error(error);
          setMensagem("Erro ao enviar os dados.")
      }

  };


  const handleExcluir = (index, e) => {
    if (e) e.stopPropagation();
    setCuidados((p) => p.filter((_, i) => i !== index));
    if (selecionado === index) setSelecionado(null);
  };


  const toggleSelecionado = (index) => {
    setSelecionado((s) => (s === index ? null : index));
  };


  const irDuvida = (e) => {
    if (e) e.stopPropagation();
    router.push("/duvida");
  };


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* Perfil: bonequinha + nome */}
        <div className={styles.profile} onClick={() => {}}>
          {/* Coloque /bonequinha.png em public, ou troque o src abaixo por um link */}
          <img
            src="/bonequinha.png"
            alt="Bonequinha"
            className={styles.logo}
            onError={(e) => {
              // fallback se imagem local não existir: troca por imagem online
              e.currentTarget.src = "https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg";
            }}
          />
          <span className={styles.profileName}>Anne Karine</span>
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


          {/* Casinha com href para home */}
          <Link href="/" className={styles.homeLink} aria-label="Home" title="Home">
            <span className={styles.homeIcon}>🏠</span>
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
                {/* botão dúvida (usa router.push) */}
                <button
                  className={styles.duvidaBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    irDuvida(e);
                  }}
                  aria-label={`Dúvida sobre ${item}`}
                >
                  ?
                </button>


                {/* botão Excluir aparece quando o item é selecionado */}
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
                setNome(""); // limpar input
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </section>


      {/* Salvar: usa Link para manter navegação via href */}
     <Link href="/unhas" className={styles.salvarBtn}>
        Salvar
      </Link>
    </div>
  );
}
