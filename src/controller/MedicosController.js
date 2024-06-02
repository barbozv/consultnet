import {buscarMedicos, alterarMedicos, deletarMedicos, cadastrarMedicos} from "../repository/MedicosRepository.js";


import { Router } from "express"
let endpoints = Router();

endpoints.post('/medicos/', async (req, resp) => {
    try{
        let medicos = req.body;

        let r = await cadastrarMedicos(medicos);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})

endpoints.get('/medicos/', async (req, resp) => {
    try{
        let medicos = req.query.medicos;

        let r = await buscarMedicos(medicos);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})



endpoints.put('/medicos/:id', async (req, resp) => {
    
    try{
        let id = req.params.id;
        let medicos = req.body;
    
        let r = await alterarMedicos(id, medicos);
        if(r==0)
            throw new Error (`Médico não existe.`);
        resp.status(202).send();
    }
    catch (err){
        resp.status(400).send({erro:err.message})
    }
    })

endpoints.delete('/medicos/:id', async (req, resp) => {
try{
    let id = req.params.id;

    let r = await deletarMedicos(id);
    
    if(r==0)
        throw new Error (`Médico não existe.`);
    resp.status(202).send();
}
catch (err){
    resp.status(400).send({erro:err.message})
}
})

export default endpoints;

