import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";




export const getAllFilmesProvider = async (): Promise<IFimes[] | Error> => {

    try {
        const allFilmes = await prisma.filme.findMany();

        if(allFilmes) return allFilmes;

        return Error("Erro ao buscar lista de filmes");
    } catch (error) {
        console.log(error);
        return Error("Erro ao buscar lista de filmes");
    }

};