// app/api/autenticacao/login/route.js
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, senha } = await request.json();

    if (!email || !senha) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      const resultDB = await client.query(
        "SELECT id, nome, senha_hash, role, email FROM consumidor WHERE email = $1",
        [email]
      );

      const user = resultDB.rows[0];

      if (!user) {
        return NextResponse.json(
          { message: "Credenciais inválidas." },
          { status: 401 }
        );
      }

      const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);

      if (!senhaCorreta) {
        return NextResponse.json(
          { message: "Credenciais inválidas." },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          message: "Login realizado com sucesso!",
          user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role,
          },
        },
        { status: 200 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
