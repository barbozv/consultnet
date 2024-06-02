import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'

import PacientesController from './controller/PacientesController.js'; 
import MedicosController from './controller/MedicosController.js';

let servidor = express();
servidor.use( cors());
servidor.use(express.json()); 

servidor.use(PacientesController);
servidor.use(MedicosController);

let porta = process.env.PORTA;
servidor.listen(porta, ()=> console.log(`API subiu na porta ${porta}`))