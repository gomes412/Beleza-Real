import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const usuario = await db.query("SELECT * FROM usuario");
    return NextResponse.json(usuario.rows);
}


export async function POST(request) {
  try {
    const { nome, senha, email } = await request.json()
    await db.query(
      'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)',
      [nome, senha, email]
    )
    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.error('Error adding usuario:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}