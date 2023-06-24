import { ISerieRetun } from "../../database/models/Series";
import { prisma } from "../../database/prisma";

interface ISerieProps extends Omit<ISerieRetun, "titulo_temporada" | "num_episodios">{}

export const getSerieByIdProvider = async (id: string): Promise<ISerieProps | Error> => {
    try {

        const serie = await prisma.serie.findFirst({
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

        if(serie){
            return serie;
        } else {
            return Error(`Error ao buscar serie com id: ${serie}`);
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Error ao buscar serie");
    }
};