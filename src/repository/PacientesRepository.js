import con from './connection.js'

export async function cadastrarPacientes(pacientes) {
    let comando =`
    INSERT INTO pacientes
    (
        "nome",
        "email", 
        "data_nascimento",
        "cpf"
    )
    VALUES (?, ?, ?, ?); 
    `
     let res= await con.query(comando,[
        pacientes.nome,
        pacientes.email,
        pacientes.data_nascimento,
        pacientes.cpf,
    ])
     let info = res[0];

     pacientes.id = info.insertId;
     return pacientes;
}

export async function buscarPacientes(){
    let comando = `
    SELECT id as id,
        nome,
        email,
        data_nascimento,
        cpf
        FROM pacientes
    `

    let res = await con.query(comando);
    let linhas = res[0];

    return linhas;
} 



export async function deletarPacientes(id){

    let comando = `
    DELETE FROM pacientes
    WHERE id = ?
    `
    let res= await con.query(comando, [id]);
    let info = res[0];

    return info.affectedRows;

}

export async function alterarPacientes(id, pacientes) {
    let comando = `
    UPDATE pacientes
        SET nome = ?,
        email = ?,
        data_nascimento = ?,
        cpf = ?   
    WHERE id = ?
    `;

    let res = await con.query(comando, [
        pacientes.nome,
        pacientes.email,
        pacientes.data_nascimento,
        pacientes.cpf  
    ]);

    let info = res[0];
    if (info.affectedRows > 0) {
        return pacientes;
    } else {
        throw new Error('Atualização falhou');
    }
}


; 