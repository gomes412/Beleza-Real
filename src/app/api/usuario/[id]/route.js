import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = await params;
    const usuario = await db.query("SELECT * FROM usuario where id = $1", [id]);
    return NextResponse.json(usuario.rows);
}
