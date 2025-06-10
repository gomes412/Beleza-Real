import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const usuario = await db.query("SELECT * FROM usuario");
    const compartilhamento = await db.query("SELECT * FROM compartilhamento");
    const calendario = await db.query("SELECT * FROM calendario");
    const cuidado = await db.query("SELECT * FROM cuidado");
    const notificacoes = await db.query("SELECT * FROM notificacoes");
    return NextResponse.json({
    usuario: usuario.rows,
    compartilhamento: compartilhamento.rows,
    calendario: calendario.rows,
    cuidado: cuidado.rows,
    notificacoes: notificacoes.rows,
    });
}

   
