import con from './connection.js'

export async function cadastrarUsuario(tb_usuarios) {
    let comando =`
    INSERT INTO tb_usuarios
    (
        nome,
        email,
        senha,
        data_nascimento,
        cpf, 
        rg,
        tipo,
        especializacao,
        mini_curriculot,
        responsavel_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?); 
    `
     let res= await con.query(comando,[
        usuarios.nome,
        usuarios.email,
        usuarios.senha,
        usuarios.data_nascimento,
        usuarios.cpf, 
        usuarios.rg,
        usuarios.tipo,
        usuarios.especializacao,
        usuarios.mini_curriculot,
        usuarios.responsavel_id])
     let info = res[0];

     usuarios.id = info.insertId;
     return usuarios;
}

export async function buscarUsuario(){
    let comando = `
    SELECT id as id,
        nome as nome,
        email as email,
        senha as senha,
        data_nascimento as nasc,
        cpf as cpf, 
        rg as rg,
        tipo as tipo,
        especializacao as especializacao,
        mini_curriculot as cv,
        responsavel_id as responsavel
    FROM tb_usuarios
    `

    let res = await con.query(comando);
    let linhas = res[0];

    return linhas;
} 



export async function deletarUsuario(id){

    let comando = `
    DELETE FROM tb_usuarios
    WHERE id = ?
    `
    let res= await con.query(comando, [id]);
    let info = res[0];

    return info.affectedRows;

}

export async function alterarUsuario(id, usuarios) {
    let comando = `
    UPDATE tb_usuarios
        SET nome = ?,
        email = ?,
        senha = ?,
        nasc = ?,
        cpf = ?, 
        rg= ?,
        tipo = ?,
        especializacao = ?,
        cv = ?,
        responsavel_id = ?,
        doutor_id = ?,
        motivo = ?
    WHERE id = ?
    `;

    let res = await con.query(comando, [
        usuarios.nome,
        usuarios.email,
        usuarios.senha,
        usuarios.data_nascimento,
        usuarios.cpf, 
        usuarios.rg,
        usuarios.tipo,
        usuarios.especializacao,
        usuarios.mini_curriculot,
        usuarios.responsavel_id
    ]);

    let info = res[0];
    if (info.affectedRows > 0) {
        return usuarios;
    } else {
        throw new Error('Atualização falhou');
    }
}


; 