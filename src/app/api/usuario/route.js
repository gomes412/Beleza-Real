import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM usuario");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nome, email, senha } = await request.json();

    if (!nome || !email || !senha) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    // Verifica se o e-mail já existe
    const existe = await db.query("SELECT id FROM usuario WHERE email = $1", [email]);
    if (existe.rows.length > 0) {
      return NextResponse.json(
        { error: "E-mail já cadastrado." },
        { status: 409 }
      );
    }

    // Insere no banco (agora na ordem certa!)
    const result = await db.query(
      "INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}