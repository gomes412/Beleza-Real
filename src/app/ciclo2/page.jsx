"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function CicloMenstrual() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [userName, setUserName] = useState("");
  const [firstSelectionDone, setFirstSelectionDone] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioNome");
    if (storedUser) setUserName(storedUser);

    const saved = localStorage.getItem("cicloMenstrual");
    if (saved) {
      const data = JSON.parse(saved);
      setHighlightedDays(data.highlightedDays || []);
      setSelectedDate(data.selectedDate ? new Date(data.selectedDate) : null);
      setCurrentMonth(data.currentMonth ? new Date(data.currentMonth) : new Date());
      setFirstSelectionDone(data.firstSelectionDone || false);
    }
  }, []);

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    if (!firstSelectionDone) {
      const newHighlighted = [];
      for (let i = 0; i < 5; i++) {
        newHighlighted.push(new Date(clickedDate).setDate(clickedDate.getDate() + i));
      }
      setHighlightedDays(newHighlighted);
      setSelectedDate(clickedDate);
      setFirstSelectionDone(true);
      saveToLocalStorage(newHighlighted, clickedDate, true);
      return;
    }

    const clickedTime = clickedDate.getTime();
    const exists = highlightedDays.includes(clickedTime);
    const updatedDays = exists
      ? highlightedDays.filter((d) => d !== clickedTime)
      : [...highlightedDays, clickedTime];

    setHighlightedDays(updatedDays);
    saveToLocalStorage(updatedDays, selectedDate, firstSelectionDone);
  };

  const saveToLocalStorage = (highlighted, date, firstSelectionFlag) => {
    localStorage.setItem(
      "cicloMenstrual",
      JSON.stringify({
        highlightedDays: highlighted,
        selectedDate: date,
        currentMonth,
        firstSelectionDone: firstSelectionFlag,
      })
    );
  };

  const handleMonthChange = (offset) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className={styles.empty}></div>);

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d).getTime();
      const isHighlighted = highlightedDays.includes(dayDate);
      days.push(
        <div
          key={d}
          className={`${styles.day} ${isHighlighted ? styles.highlighted : ""}`}
          onClick={() => handleDayClick(d)}
        >
          {d}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <img
            src="https://i.pinimg.com/736x/b3/90/ed/b390eddde26af7269b0f2c9eb566f59e.jpg"
            alt="Usuária"
            className={styles.userIcon}
          />
          <span className={styles.userName}>{userName || "Usuária"}</span>
        </div>
      </header>

      <h2 className={styles.title}>Sua próxima menstruação será:</h2>

      <div className={styles.calendar}>
        <div className={styles.monthNav}>
          <button onClick={() => handleMonthChange(-1)}>&lt;</button>
          <span>
            {currentMonth.toLocaleString("pt-BR", { month: "long", year: "numeric" })}
          </span>
          <button onClick={() => handleMonthChange(1)}>&gt;</button>
        </div>
        <div className={styles.daysGrid}>{renderDays()}</div>
      </div>

      <Link href="/diaria" className={styles.saveButton}>
        Voltar
      </Link>
    </div>
  );
}
