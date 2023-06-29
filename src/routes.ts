import { Router } from "express";
import { validarReqCreateFilme, criarFilme} from "./controllers/filmes/CreateFilme";
import { validarReqGetAll, getAllFilmes } from "./controllers/filmes/GetAllFilmes";
import { validarReqGetFilmeById, getFilmeById} from "./controllers/filmes/GetFilmeById";
import { validarReqDeleteFilmeById, deteteFilmeById } from "./controllers/filmes/DeleteFilmeById";
import { validarReqUpdateFilmeByIdBody, validarReqUpdateFilmeByIdParams, updateFilmeById} from "./controllers/filmes/UpdateFilmeById";

import { validarReqCreateSerie, createSerie } from "./controllers/series/CreateSerie";
import { validarReqGetAllSerie, getAllSerie } from "./controllers/series/GetAllSeries";
import { validarReqDeleteSerieById, deleteSerieById } from "./controllers/series/DeleteSerieById";
import { validarReqGetSerieById, getSerieById } from "./controllers/series/GetSerieById";
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
import { validarReqDeleteAllEpisodiosById, deleteAllEpisodiosById } from "./controllers/episodios/DeleteAllEpisodiosById";
import { validarReqDeleteEpisodioById, deleteEpisodioById } from "./controllers/episodios/DeleteEpisodioById";
import { validarReqDeleteEpisodiosByIds, deleteEpisodiosByIds } from "./controllers/episodios/DeleteEpisodiosByIds";
import { validarReqCreateUsuario, createUsuario} from "./controllers/usuarios/CreateUsuario";
import { validarReqLogarUsuario, entrar } from "./controllers/usuarios/Entrar";
import { autenticarRota } from "./middleware/AutenticarRota";
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

/*ROTA DE SERIE*/
router.post("/create/serie", autenticarRota, validarReqCreateSerie, createSerie);
router.get("/serie", validarReqGetAllSerie, getAllSerie);
router.get("/serie/:id", validarReqGetSerieById, getSerieById );
router.delete("/serie/:id", autenticarRota, validarReqDeleteSerieById, deleteSerieById );
router.put("/serie/:id", autenticarRota, validarReqUpdateSerieByIdBody, validarReqUpdateSerieByIdParams, updateSerieById);

/*ROTA DE TEMPORADA*/
router.post("/create/temporada", autenticarRota, validarReqCreateTemporada, createTemporada);
router.get("/temporada/all/:id", validarReqGetAllTemporadaSerieById, getAllTemporadas);
router.get("/temporada/:id", validarReqGetTemporadaById, getTemporadaById);
router.put("/temporada/:id", autenticarRota, validarReqUpdateTemporadaByIdParams, validarReqUpdateTemporadaByIdBody, updateTemporadaById);
router.delete("/temporada/all/:id", autenticarRota, validarReqDeleteAllTemporada, deleteAllTemporadas);
router.delete("/temporada/:id", autenticarRota, validarReqDeleteTemporada, deletTemporada);


/*ROTA DE EPISODIOS*/
router.post("/create/episodio/:id", autenticarRota, validarReqCreateEpisodiobody, validarReqCreateEpisodioparams, cerateEpisodio);
router.get("/episodio/all/:id", validarReqGetEpisodioAllById, getAllEpisodiosById);
router.get("/episodio/:id", validarReqGetEpisodioById, getEpisodioById);
router.put("/episodio/:id", autenticarRota, validarReqUpdateEpisodioByIdParams, validarReqUpdateEpisodioByIdBody, updateEpisodioById);
router.delete("/episodio/all/:id", autenticarRota, validarReqDeleteAllEpisodiosById, deleteAllEpisodiosById);
router.delete("/episodio/:id", autenticarRota, validarReqDeleteEpisodioById, deleteEpisodioById);
router.delete("/episodio", autenticarRota, validarReqDeleteEpisodiosByIds, deleteEpisodiosByIds);


/*ROTA DE USUARIOS*/
router.get("/usuario/:id", autenticarRota, validarReqGetUsuarioById, getUsuarioById);
router.post("/cadastrar", validarReqCreateUsuario, createUsuario );
router.post("/entrar", validarReqLogarUsuario, entrar);

