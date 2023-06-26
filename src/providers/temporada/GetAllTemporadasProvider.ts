import { ITemporadaReturn } from "../../database/models/Series";
import { prisma } from "../../database/prisma";

interface ITemporadaProps extends ITemporadaReturn {}

export const getAllTemporadasProvider = async (id: string): Promise<ITemporadaProps[] | Error> => {

    try {

        const temporadas = await prisma.temporada.findMany({
            where: {
                serieId: id
            },

            select: {
                id: true,
                titulo: true,
                num_episodios: true,
                serieId: true,
                episodios: {}
            }
        });

        if(temporadas) {
            return temporadas;
        } else {
            return Error("Erro ao buscar a serie");
        }
        
    } catch (error) {
        console.log(`Error: ${error}`);
        return Error("Erro ao buscar temporadas");
    }
};