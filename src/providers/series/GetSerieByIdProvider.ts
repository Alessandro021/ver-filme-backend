import { ISerieRetun } from "../../database/models/Series";
import { prisma } from "../../database/prisma";

interface ISerieProps extends Omit<ISerieRetun, "titulo_temporada" | "num_episodios" | "episodios" >{}

export const getSerieByIdProvider = async (id: string): Promise<{} | Error> => {
    try {

        const serie = await prisma.serie.findMany({
            where: { id: id },       

            select: {
                id: true,
                linguagem: true,
                titulo: true,
                genero: true,
                descricao: true,
                popularidade: true,
                poster: true,
                imagem_fundo: true,
                data: true,
                trailer: true,
                voto_medio: true,
                type: true,
                _count: {
                    select: {
                        temporada: true,
                    }
                },
                temporada:  {
                    select: {
                        id: true,
                        titulo: true,
                        num_episodios: true,
                        serieId: true,
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
                            }, //orderBy: { data: "asc"}
                        }
                    }, //orderBy: {titulo: "asc"}
                },
            },
        });

        if(serie){
            return serie;
        } else {
            return Error(`Error ao buscar serie com id: ${id}`);
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Error ao buscar serie");
    }
};