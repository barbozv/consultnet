import con from './connection.js'

export async function fazerAgendamentos(tb_agendamentos) {
    let comando =`
    INSERT INTO tb_agendamentos 
    (
        data, 
        paciente_id, 
        doutor_id, 
        motivo
    )
    VALUES (?, ?, ?, ?); 
    `
     let res= await con.query(comando,[
        agendamentos.data, 
        agendamentos.paciente_id, 
        agendamentos.doutor_id, 
        agendamentos.motivo])
     let info = res[0];

     agendamentos.id = info.insertId;
     return agendamentos;
}

export async function consultarAgendamentos(paciente_id){
    let comando = `
    SELECT id as id,
        data as data, 
        paciente_id as paciente, 
        doutor_id as doutor, 
        motivo as motivo
    FROM tb_agendamentos
    WHERE paciente_id like ?
    `

    let res = await con.query(comando, [ '%' + paciente_id + '%']);
    let linhas = res[0];

    return linhas;
} 



export async function removerAgendamentos(id){

    let comando = `
    DELETE FROM tb_agendamentos
    WHERE id = ?
    `
    let res= await con.query(comando, [id]);
    let info = res[0];

    return info.affectedRows;

}

export async function alterarAgendamentos(id, agendamentos) {
    let comando = `
    UPDATE tb_agendamentos
        SET data = ?,
        paciente_id = ?,
        doutor_id = ?,
        motivo = ?
    WHERE id = ?
    `;

    let res = await con.query(comando, [
        agendamentos.data, 
        agendamentos.paciente_id, 
        agendamentos.doutor_id, 
        agendamentos.motivo,
        id
    ]);

    let info = res[0];
    if (info.affectedRows > 0) {
        return agendamentos;
    } else {
        throw new Error('Atualização falhou');
    }
}


; 