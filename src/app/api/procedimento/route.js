import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();

        const nome = formData.get("nome");

        const query = `
            INSERT INTO procedimento (nome)
            VALUES ($1)
            RETURNING *;
        `

        const values = [nome];

        const result = await db.query(query, values)
        const procedimentoAdd = result.rows[0];

        return new Response(JSON.stringify(procedimentoAdd), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Erro ao adicionar procedimento", error);
        return new Response(JSON.stringify({ error: 'Erro interno do servidor'}), {
            status: 500,
        })
    }

    
}
 