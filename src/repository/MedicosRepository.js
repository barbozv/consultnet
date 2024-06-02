import con from './connection.js'

export async function cadastrarMedicos(medicos) {
    let comando =`
    INSERT INTO medicos
    (
        nome,
        email, 
        crm
    )
    VALUES (?, ?, ?); 
    `
     let res= await con.query(comando,[
        medicos.nome,
        medicos.email,
        medicos.crm])
     let info = res[0];

     medicos.id = info.insertId;
     return medicos;
}

export async function buscarMedicos(){
    let comando = `
    SELECT id as id,
        nome,
        email,
        crm
        FROM medicos
    `

    let res = await con.query(comando);
    let linhas = res[0];

    return linhas;
} 



export async function deletarMedicos(id){

    let comando = `
    DELETE FROM medicos
    WHERE id = ?
    `
    let res= await con.query(comando, [id]);
    let info = res[0];

    return info.affectedRows;

}

export async function alterarMedicos(id, medicos) {
    let comando = `
    UPDATE medicos
        SET nome = ?,
        email = ?,
        crm = ?   
    WHERE id = ?
    `;

    let res = await con.query(comando, [
        medicos.nome,
        medicos.email,
        medicos.crm,
        id 
    ]);

    let info = res[0];
    if (info.affectedRows > 0) {
        return medicos;
    } else {
        throw new Error('Atualização falhou');
    }
}


; 