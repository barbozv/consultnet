import con from './connection.js'

export async function fazerAgendamentos(agendamentos) {
    let comando =`
    INSERT INTO agendamentos 
    (
        data, 
        pacientes_nome, 
        medicos_nome, 
        motivo
    )
    VALUES (?, ?, ?, ?); 
    `
     let res= await con.query(comando,[
        agendamentos.data, 
        agendamentos.pacientes_nome, 
        agendamentos.medicos_nome, 
        agendamentos.motivo])
     let info = res[0];

     agendamentos.id = info.insertId;
     return agendamentos;
}

export async function consultarAgendamentos(){
    let comando = `
    SELECT id as id,
        data as data, 
        pacientes_nome as paciente, 
        medicos_nome as medico, 
        motivo as motivo
    FROM agendamentos
    `

    let res = await con.query(comando,);
    let linhas = res[0];

    return linhas;
} 

export async function consultarAgendamento(pacientes_nome){
    let comando = `
    SELECT id as id,
        data as data, 
        pacientes_nome as paciente, 
        medicos_nome as medico, 
        motivo as motivo
    FROM agendamentos
    WHERE pacientes_nome like ?
    `

    let res = await con.query(comando,['%' + pacientes_nome + '%']);
    let linhas = res[0];

    return linhas;
} 



export async function removerAgendamentos(id){

    let comando = `
    DELETE FROM agendamentos
    WHERE id = ?
    `
    let res= await con.query(comando, [id]);
    let info = res[0];

    return info.affectedRows;

}

export async function alterarAgendamentos(id, agendamentos) {
    let comando = `
    UPDATE agendamentos
        SET data = ?,
        pacientes_nome = ?,
        medicos_nome = ?,
        motivo = ?
    WHERE id = ?
    `;

    let res = await con.query(comando, [
        agendamentos.data, 
        agendamentos.pacientes_nome, 
        agendamentos.medicos_nome, 
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