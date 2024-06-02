import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'

import PacienteController from './controller/PacienteController.js' 

let servidor = express();
servidor.use( cors());
servidor.use(express.json()); 

servidor.use(PacienteController);

let porta = process.env.PORTA;
servidor.listen(porta, ()=> console.log(`API subiu na porta ${porta}`))