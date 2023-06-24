import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";

export const getAllFilmesProvider = async (pagina: number, limite: number, filtrar: string): Promise<IFimes[] | Error> => {
    try {
        const allFilmes = await prisma.filme.findMany({

            where: {
                titulo: {
                    contains: filtrar,
                    mode: "insensitive"
                }
            },
            skip: (pagina -1)  * limite,
            take: limite,
            
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
                imagem_fundo: true,
                data: true,
                video: true,
                trailer: true,
                voto_medio: true
            }
        });

        if(allFilmes){
            return allFilmes;
        } else {
            return Error("Erro ao buscar lista de filmes");
        }
    } catch (error) {
        console.log(error);
        return Error("Erro ao buscar lista de filmes");
    }

};