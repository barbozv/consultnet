import {cadastrarUsuario, buscarUsuario, alterarUsuario, deletarUsuario } from "../repository/UsuarioRepository.js";


import { Router } from "express"
let endpoints = Router();

endpoints.post('/novousuario/', async (req, resp) => {
    try{
        let usuarios = req.body;

        let r = await cadastrarUsuario(usuarios);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})

endpoints.get('/usuarios/', async (req, resp) => {
    try{
        let cadastro = req.query.cadastro;

        let r = await buscarUsuario(cadastro);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})



endpoints.put('/usuarios/:id', async (req, resp) => {
    
    try{
        let id = req.params.id;
        let usuarios = req.body;
    
        let r = await alterarUsuario(id, usuarios);
        if(r==0)
            throw new Error (`Usuário não existe.`);
        resp.status(202).send();
    }
    catch (err){
        resp.status(400).send({erro:err.message})
    }
    })

endpoints.delete('/usuarios/:id', async (req, resp) => {
try{
    let id = req.params.id;

    let r = await deletarUsuario(id);
    
    if(r==0)
        throw new Error (`Usuário não existe.`);
    resp.status(202).send();
}
catch (err){
    resp.status(400).send({erro:err.message})
}
})

export default endpoints;

