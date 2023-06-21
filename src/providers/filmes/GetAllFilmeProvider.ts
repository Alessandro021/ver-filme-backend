import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";




export const getAllFilmesProvider = async (): Promise<IFimes[] | Error> => {

    try {
        const allFilmes = await prisma.filme.findMany({
            select: {
                // createAt: false,
                // updateAt: false,
                id: true,
                linguagem: true,
                titulo: true,
                genero: true,
                descricao: true,
                popularidade: true,
                type: true,
                poster: true,
                data: true,
                video: true,
                trailer: true,
                voto_medio: true
            }
        });

        if(allFilmes) return allFilmes;

        await prisma.$disconnect();

        return Error("Erro ao buscar lista de filmes");
    } catch (error) {
        console.log(error);
        return Error("Erro ao buscar lista de filmes");
    }

};