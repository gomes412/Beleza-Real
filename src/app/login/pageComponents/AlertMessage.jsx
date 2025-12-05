// app/telaLogin/pageComponents/AlertMessage.jsx
"use client";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";

export default function AlertMessage({
  type = "success", // "success" ou "error"
  message = "",
  duration = 5000,
  onClose = () => {},
  redirectToCadastro = false,
}) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose(), duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <Stack sx={{ width: "100%" }} spacing={2} mb={2}>
      {type === "success" && (
        <Alert variant="filled" severity="success">
          {message}
        </Alert>
      )}
      {type === "error" && (
        <Alert variant="filled" severity="error">
          {message}{" "}
          {redirectToCadastro && (
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                marginLeft: 8,
              }}
              onClick={() => (window.location.href = "/cadastro")}
            >
              Clique aqui para se cadastrar.
            </span>
          )}
        </Alert>
      )}
    </Stack>
  );
}
