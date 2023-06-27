import { IEpisodios } from "../../database/models/Series";
import { prisma } from "../../database/prisma";

interface IEpisodioProps extends IEpisodios{
    temporadaId: string;
}

export const getAllEpisodiosByIdProvider = async (id: string): Promise<IEpisodioProps[] | Error> => {
    try {
        const episodios = await prisma.episodio.findMany({
            where: {
                temporadaId: id
            }
        });

        if(episodios){
            return episodios;
        } else {
            return Error(`Erro, temporada com id: ${id} não existe.`);
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao buscar series");
    }
};