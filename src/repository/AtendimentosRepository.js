import con from './connection.js'

export async function registrarAtendimentos(atendimentos) {
    let comando =`
    INSERT INTO atendimentos 
    (
        data, 
        pacientes_nome, 
        medicos_nome, 
        diagnostico,
        tratamento
    )
    VALUES (?, ?, ?, ?, ?); 
    `
     let res= await con.query(comando,[
        atendimentos.data, 
        atendimentos.pacientes_nome, 
        atendimentos.medicos_nome, 
        atendimentos.diagnostico,
        atendimentos.tratamento,]
        )
     let info = res[0];

     atendimentos.id = info.insertId;
     return atendimentos;
}

export async function consultarAtendimentos(){
    let comando = `
    SELECT id,
        data, 
        pacientes_nome, 
        medicos_nome, 
        diagnostico,
        tratamento
    FROM atendimentos
    `

    let res = await con.query(comando,);
    let linhas = res[0];

    return linhas;
} 



export async function removerAtendimentos(id){

    let comando = `
    DELETE FROM atendimentos
    WHERE id = ?
    `
    let res= await con.query(comando, [id]);
    let info = res[0];

    return info.affectedRows;

}

export async function alterarAtendimentos(id, atendimentos) {
    let comando = `
    UPDATE atendimentos
        SET data = ?,
        pacientes_nome = ?,
        medicos_nome = ?,
        diagnostico = ?,
        tratamento = ?
    WHERE id = ?
    `;

    let res = await con.query(comando, [
        atendimentos.data, 
        atendimentos.pacientes_nome, 
        atendimentos.medicos_nome, 
        atendimentos.diagnostico,
        atendimentos.tratamento,
        id
    ]);

    let info = res[0];
    if (info.affectedRows > 0) {
        return atendimentos;
    } else {
        throw new Error('Atualização falhou');
    }
}


; 