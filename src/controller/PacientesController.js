import {buscarPacientes, cadastrarPacientes, alterarPacientes, deletarPacientes} from "../repository/PacientesRepository.js";


import { Router } from "express"
let endpoints = Router();

endpoints.post('/pacientes/', async (req, resp) => {
    try{
        let pacientes = req.body;

        let r = await cadastrarPacientes(pacientes);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})

endpoints.get('/pacientes/', async (req, resp) => {
    try{
        let pacientes = req.query.pacientes;

        let r = await buscarPacientes(pacientes);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})



endpoints.put('/pacientes/:id', async (req, resp) => {
    
    try{
        let id = req.params.id;
        let pacientes = req.body;
    
        let r = await alterarPacientes(id, pacientes);
        if(r==0)
            throw new Error (`Paciente não existe.`);
        resp.status(202).send();
    }
    catch (err){
        resp.status(400).send({erro:err.message})
    }
    })

endpoints.delete('/pacientes/:id', async (req, resp) => {
try{
    let id = req.params.id;

    let r = await deletarPacientes(id);
    
    if(r==0)
        throw new Error (`Paciente não existe.`);
    resp.status(202).send();
}
catch (err){
    resp.status(400).send({erro:err.message})
}
})

export default endpoints;

