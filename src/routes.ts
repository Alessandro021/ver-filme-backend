import { Router } from "express";
import { criarValidarFilme, criarFilme} from "./controllers/filmes/CreateFilme";
import { getAllFilmes } from "./controllers/filmes/GetAllFilmes";

export const router = Router();

//Rota de Test
router.get("/", (req, res) => {return res.status(422).send("Server funcionando");});


/*ROTA DE FILME*/
router.post("/create", criarValidarFilme, criarFilme);
router.get("/filmes", getAllFilmes);



