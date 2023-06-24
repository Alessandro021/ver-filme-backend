import { string } from "yup";
import { prisma } from "../../database/prisma";

interface  ISerieProps {
    id: string;
    linguagem: string;
    titulo: string;
    descricao: string;
    popularidade?: number;
    genero: string
    poster: string;
    data: string;
    video?: string;
    trailer?: string;
    voto_medio: number;
    temporada: ITemporada[]
 
}

interface  ITemporada {
    id: string;
    titulo: string;
    num_episodios: number;
}


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
                video: true,
                trailer: true,
                voto_medio: true,
                type: true,
                _count: true,
                temporada: {
                    select: {
                        id: true,
                        titulo: true,
                        num_episodios: true,
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