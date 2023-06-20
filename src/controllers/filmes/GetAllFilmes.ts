import { Request, Response } from "express";
import { getAllFilmesProvider } from "../../providers/filmes/GetAllFilmeProvider";


export const getAllFilmes = async ( req: Request, res: Response)=> {
    
    const allFilmes = await getAllFilmesProvider();

    if(allFilmes instanceof Error){
        return res.status(500).json({
            error : {
                default: allFilmes.message
            }
        });
    }

    return res.status(200).json(allFilmes);
};