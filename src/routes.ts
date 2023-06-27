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
import { validarReqCreateTemporada, createTemporada } from "./controllers/temporada/CreateTemporada";
import { validarReqGetAllTemporadaSerieById, getAllTemporadas} from "./controllers/temporada/GetAllTemporadas";
import { validarReqDeleteAllTemporada, deleteAllTemporadas } from "./controllers/temporada/DeleteAllTemporada";
import { validarReqDeleteTemporada, deletTemporada } from "./controllers/temporada/DeleteTemporadaById";
import { validarReqGetTemporadaById, getTemporadaById } from "./controllers/temporada/GetTemporadaById";
import { validarReqUpdateTemporadaByIdParams, validarReqUpdateTemporadaByIdBody, updateTemporadaById} from "./controllers/temporada/UpdateTemporadaById";
import { validarReqCreateEpisodiobody, validarReqCreateEpisodioparams, cerateEpisodio } from "./controllers/episodios/CreateEpisodio";
import { validarReqGetEpisodioAllById, getAllEpisodiosById } from "./controllers/episodios/GetAllEpisodiosById";
import { validarReqGetEpisodioById, getEpisodioById } from "./controllers/episodios/GetEpisodioById";
import { validarReqUpdateEpisodioByIdParams, validarReqUpdateEpisodioByIdBody, updateEpisodioById } from "./controllers/episodios/UpdateEpisodioById";

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

/*ROTA DE TEMPORADA*/
router.post("/create/temporada", validarReqCreateTemporada, createTemporada);
router.get("/temporada/all/:id", validarReqGetAllTemporadaSerieById, getAllTemporadas);
router.get("/temporada/:id", validarReqGetTemporadaById, getTemporadaById);
router.put("/temporada/:id", validarReqUpdateTemporadaByIdParams, validarReqUpdateTemporadaByIdBody, updateTemporadaById);
router.delete("/temporada/all/:id", validarReqDeleteAllTemporada, deleteAllTemporadas);
router.delete("/temporada/:id", validarReqDeleteTemporada, deletTemporada);


/*ROTA DE EPISODIOS*/
router.post("/create/episodio/:id", validarReqCreateEpisodiobody, validarReqCreateEpisodioparams, cerateEpisodio);
router.get("/episodio/all/:id", validarReqGetEpisodioAllById, getAllEpisodiosById);
router.get("/episodio/:id", validarReqGetEpisodioById, getEpisodioById);
router.put("/episodio/:id", validarReqUpdateEpisodioByIdParams, validarReqUpdateEpisodioByIdBody, updateEpisodioById);



