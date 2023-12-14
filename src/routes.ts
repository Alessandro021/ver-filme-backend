import { Router } from "express";

import { autenticarRota } from "./middleware/AutenticarRota";

import { validarReqCreateFilme, criarFilme} from "./controllers/filmes/CreateFilme";
import { validarReqGetAll, getAllFilmes } from "./controllers/filmes/GetAllFilmes";
import { validarReqGetFilmeById, getFilmeById} from "./controllers/filmes/GetFilmeById";
import { validarReqDeleteFilmeById, deteteFilmeById } from "./controllers/filmes/DeleteFilmeById";
import { validarReqUpdateFilmeByIdBody, validarReqUpdateFilmeByIdParams, updateFilmeById} from "./controllers/filmes/UpdateFilmeById";

import { validarReqCreateUsuario, createUsuario} from "./controllers/usuarios/CreateUsuario";
import { validarReqLogarUsuario, entrar } from "./controllers/usuarios/Entrar";
import { validarReqGetUsuarioById, getUsuarioById } from "./controllers/usuarios/GetUsuarioById";


export const router = Router();

//Rota de Test
router.get("/", (req, res) => {return res.status(422).send("Server funcionando");});


/*ROTA DE FILME*/
router.post("/create/filme", autenticarRota, validarReqCreateFilme, criarFilme);
router.get("/filmes", validarReqGetAll, getAllFilmes);
router.get("/filme/:id", validarReqGetFilmeById, getFilmeById );
router.delete("/filme/:id", autenticarRota, validarReqDeleteFilmeById, deteteFilmeById );
router.put("/filme/:id", autenticarRota, validarReqUpdateFilmeByIdBody, validarReqUpdateFilmeByIdParams, updateFilmeById );

/*ROTA DE USUARIOS*/
router.get("/usuario/:id", autenticarRota, validarReqGetUsuarioById, getUsuarioById);
router.post("/cadastrar", validarReqCreateUsuario, createUsuario );
router.post("/entrar", validarReqLogarUsuario, entrar);

