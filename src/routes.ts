import { Router } from "express";
import { validarReqCreateFilme, criarFilme} from "./controllers/filmes/CreateFilme";
import { getAllFilmes, validarReqGetAll } from "./controllers/filmes/GetAllFilmes";
import { validarReqGetFilmeById, getFilmeById} from "./controllers/filmes/GetFilmeById";
import { deteteFilmeById, validarReqDeleteFilmeById } from "./controllers/filmes/DeleteFilmeById";
import { validarReqUpdateFilmeByIdBody, validarReqUpdateFilmeByIdParams, updateFilmeById} from "./controllers/filmes/UpdateFilmeById";
import { createSerie, validarReqCreateSerie } from "./controllers/series/CreateSerie";

export const router = Router();

//Rota de Test
router.get("/", (req, res) => {return res.status(422).send("Server funcionando");});


/*ROTA DE FILME*/
router.post("/create", validarReqCreateFilme, criarFilme);
router.get("/filmes", validarReqGetAll, getAllFilmes);
router.get("/filme/:id", validarReqGetFilmeById, getFilmeById );
router.delete("/filme/:id", validarReqDeleteFilmeById, deteteFilmeById );
router.put("/filme/:id", validarReqUpdateFilmeByIdBody, validarReqUpdateFilmeByIdParams, updateFilmeById );

/*ROTA DE SERIE*/
router.post("/create/serie", validarReqCreateSerie, createSerie);



