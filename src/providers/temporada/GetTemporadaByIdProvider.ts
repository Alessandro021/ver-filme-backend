import { ITemporadaReturn } from "../../database/models/Series";
import { prisma } from "../../database/prisma";


export const getTemporadaByIdProvider = async (id: string): Promise<ITemporadaReturn | Error> => {
    try {
        
        const result = await prisma.temporada.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                titulo: true,
                num_episodios: true,
                serieId: true,
                episodios: {}
            }
        });

        if(result){
            return result;
        } else {
            return Error(`Error, nenhuma temporada com id: ${id} foi encontrado`);
        }


    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao buscar temporada");
    }
};