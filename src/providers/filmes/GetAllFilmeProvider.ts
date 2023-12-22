import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";

export const getAllFilmesProvider = async (pagina: number, limite: number, filtrar: string): Promise<{filmes: IFimes[], count: number, proximaPagina: boolean} | Error> => {
    try {
        const filmes = await prisma.filme.findMany({

            where: {
                OR: [
                    {
                        titulo: {
                            contains: filtrar,
                            mode: "insensitive"
                        }
                    },
                    {
                        categoria: {
                            has: filtrar,
                            
                        }
                    },
                    {
                        genero: {
                            has: filtrar,
                        }
                    }
                ]
            },
            skip: (pagina -1)  * limite,
            take: limite,
            
            select: {
                // createAt: false,
                // updateAt: false,
                id: true,
                titulo: true,
                genero: true,
                descricao: true,
                popularidade: true,
                categoria: true,
                duracao: true,
                type: true,
                poster: true,
                imagem_fundo: true,
                data: true,
                file: true,
                treiler: true,
                voto_medio: true
            }
        });

        const totalFilmes = await prisma.filme.count({
            where: {
                OR: [
                    {
                        titulo: {
                            contains: filtrar,
                            mode: "insensitive"
                        }
                    },
                    {
                        categoria: {
                            has: filtrar,
                        }
                    },
                    {
                        genero: {
                            has: filtrar,
                        }
                    }
                ]
            }
        });

        const proximaPagina = ((pagina - 1) * limite + filmes.length) < totalFilmes;

        if(filmes){
            return {filmes, count: filmes.length, proximaPagina: proximaPagina};
        } else {
            return Error("Houve um erro ao buscar lista de filmes");
        }
    } catch (error) {
        // console.log(error);
        return Error("Erro ao buscar lista de filmes");
    } finally {
        await prisma.$disconnect();
    }

};