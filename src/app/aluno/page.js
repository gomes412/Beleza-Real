/*export default () => (
   <>
    <h1>Página do alunos</h1>
    <p>O aluno ...</p>
 </>
)*/


import db from "@/lib/db"
export default async () => {
    const alunos = await db.query("select * from aluno")
 return (<>
    <h1>Lista de alunos</h1>
    <div>{alunos.rows.map( a => (<div>{a.name} faz parte do projeto {a.project}</div>) )}</div>
 </>);
}