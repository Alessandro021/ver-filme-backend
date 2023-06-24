import { Router } from "express";
import { validarReqCreateFilme, criarFilme} from "./controllers/filmes/CreateFilme";
import { getAllFilmes, validarReqGetAll } from "./controllers/filmes/GetAllFilmes";
import { validarReqGetFilmeById, getFilmeById} from "./controllers/filmes/GetFilmeById";
import { deteteFilmeById, validarReqDeleteFilmeById } from "./controllers/filmes/DeleteFilmeById";
import { validarReqUpdateFilmeByIdBody, validarReqUpdateFilmeByIdParams, updateFilmeById} from "./controllers/filmes/UpdateFilmeById";
import { createSerie, validarReqCreateSerie } from "./controllers/series/CreateSerie";
import { getAllSerie, validarReqGetAllSerie } from "./controllers/series/GetAllSeries";
import { deleteSerieById, validarReqDeleteSerieById } from "./controllers/series/DeleteSerieById";
import { getSerieById, validarReqGetSerieById } from "./controllers/series/GetSerieById";
import { validarReqUpdateSerieByIdBody, validarReqUpdateSerieByIdParams, updateSerieById } from "./controllers/series/UpdateSerieById";

export const router = Router();

//Rota de Test
router.get("/", (req, res) => {return res.status(422).send("Server funcionando");});


/*ROTA DE FILME*/
router.post("/create/filme", validarReqCreateFilme, criarFilme);
router.get("/filmes", validarReqGetAll, getAllFilmes);
router.get("/filme/:id", validarReqGetFilmeById, getFilmeById );
router.delete("/filme/:id", validarReqDeleteFilmeById, deteteFilmeById );
router.put("/filme/:id", validarReqUpdateFilmeByIdBody, validarReqUpdateFilmeByIdParams, updateFilmeById );

/*ROTA DE SERIE*/
router.post("/create/serie", validarReqCreateSerie, createSerie);
router.get("/serie", validarReqGetAllSerie, getAllSerie);
router.get("/serie/:id", validarReqGetSerieById, getSerieById );
router.delete("/serie/:id", validarReqDeleteSerieById, deleteSerieById );
router.put("/serie/:id", validarReqUpdateSerieByIdBody, validarReqUpdateSerieByIdParams, updateSerieById);






