import { fazerAgendamentos, consultarAgendamentos, alterarAgendamentos, removerAgendamentos} from "../repository/AgendamentosRepository.js";


import { Router } from "express"
let endpoints = Router();

endpoints.post('/agendamentos/', async (req, resp) => {
    try{
        let agendamentos = req.body;

        let r = await fazerAgendamentos(agendamentos);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})

endpoints.get('/agendamentos/', async (req, resp) => {
    try{
        let paciente = req.query.paciente;

        let r = await consultarAgendamentos(paciente);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})

endpoints.get('/agendamentos/:paciente_nome', async (req, resp) => {
    try{
        let paciente = req.query.pacientes_nome;

        let r = await consultarAgendamentos(paciente);

        resp.send(r);

    }
    catch(err){
        resp.status(400).send({erro: err.message})
    }

})



endpoints.put('/agendamentos/:id', async (req, resp) => {
    
    try{
        let id = req.params.id;
        let agendamentos = req.body;
    
        let r = await alterarAgendamentos(id, agendamentos);
        if(r==0)
            throw new Error (`Agendamento não existe.`);
        resp.status(202).send();
    }
    catch (err){
        resp.status(400).send({erro:err.message})
    }
    })

endpoints.delete('/agendamentos/:id', async (req, resp) => {
try{
    let id = req.params.id;

    let r = await removerAgendamentos(id);
    
    if(r==0)
        throw new Error (`Agendamento não existe.`);
    resp.status(202).send();
}
catch (err){
    resp.status(400).send({erro:err.message})
}
})

export default endpoints;

