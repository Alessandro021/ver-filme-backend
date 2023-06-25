import { ISerieRetun } from "../../database/models/Series";
import { prisma } from "../../database/prisma";

interface ISerieProps extends Omit<ISerieRetun, "titulo_temporada" | "num_episodios" | "episodios"> {}

export const getAllSerieProvider = async (pagina: number, limite: number, filtrar: string): Promise<ISerieProps[] | Error> => {
    

    try {

        const serie = await prisma.serie.findMany({
            where: { 
                titulo: {
                    contains: filtrar,
                    mode: "insensitive"
                },
            }, 
            skip: (pagina -1) * limite,
            take: limite,

            select: {
                id: true,
                linguagem: true,
                titulo: true,
                genero: true,
                descricao: true,
                popularidade: true,
                poster: true,
                data: true,
                imagem_fundo: true,
                trailer: true,
                voto_medio: true,
                type: true,
                _count: true,
                temporada: {
                    select: {
                        id: true,
                        titulo: true,
                        num_episodios: true,
                        episodios: {
                            select: {
                                id: true,
                                titulo: true,
                                descricao: true,
                                poster: true,
                                video: true,
                                data: true,
                                voto_medio: true,
                                temporadaId: true,
                            }
                        }
                    }
                },
            },
        });

        if(serie) {
            return serie;
        } else {
            return Error("Erro ao buscar a serie");
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao buscar a serie");
    }
};