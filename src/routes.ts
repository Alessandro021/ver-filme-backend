import { Router } from "express";
import { validarReqCreateFilme, criarFilme} from "./controllers/filmes/CreateFilme";
import { getAllFilmes } from "./controllers/filmes/GetAllFilmes";
import { validarReqGetFilmeById, getFilmeById} from "./controllers/filmes/GetFilmeById";

export const router = Router();

//Rota de Test
router.get("/", (req, res) => {return res.status(422).send("Server funcionando");});


/*ROTA DE FILME*/
router.post("/create", validarReqCreateFilme, criarFilme);
router.get("/filmes", getAllFilmes);
router.get("/filme/:id", validarReqGetFilmeById, getFilmeById );



