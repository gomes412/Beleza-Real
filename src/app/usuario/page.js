/*export default function Home() {
  return (
      <>
      <h1>
        
      </h1>
      </>
  );
}*/

import db from "@/lib/db"
export default async () => {
    const usuario = await db.query("select * from usuario")
 return (<>
    <h1>Lista de usuario</h1>
    <div>
      {
         usuario.rows.map(
            a => (
               <div>
                  {a.nome} faz parte do projeto {a.cargo}
               </div>
            ) 
         )
      }
   </div>
 </>);
}