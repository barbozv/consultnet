import { registrarAtendimentos, consultarAtendimentos, removerAtendimentos, alterarAtendimentos } from "../repository/AtendimentosRepository.js";


import { Router } from "express"
let endpoints = Router();

endpoints.post('/atendimentos/', async (req, resp) => {
    try{
        let atendimentos = req.body;

        let r = await registrarAtendimentos(atendimentos);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})

endpoints.get('/atendimentos/', async (req, resp) => {
    try{
        let paciente = req.query.paciente;

        let r = await consultarAtendimentos(paciente);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})

endpoints.delete('/atendimentos/:id', async (req, resp) => {
    try{
        let id = req.params.id;
    
        let r = await removerAtendimentos(id);
        
        if(r==0)
            throw new Error (`Atendimento não existe.`);
        resp.status(202).send();
    }
    catch (err){
        resp.status(400).send({erro:err.message})
    }
    })
    

endpoints.put('/atendimentos/:id', async (req, resp) => {
    
    try{
        let id = req.params.id;
        let atendimentos = req.body;
    
        let r = await alterarAtendimentos(id, atendimentos);
        if(r==0)
            throw new Error (`Atendimento não existe.`);
        resp.status(202).send();
    }
    catch (err){
        resp.status(400).send({erro:err.message})
    }
    })

export default endpoints;