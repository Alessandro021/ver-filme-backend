import { ISerie } from "../../database/models/Series";
import { prisma } from "../../database/prisma";


type ISeriesProps = Omit<ISerie, "id" | "titulo_temporada" | "num_episodios">

interface IIdProps{
    id: string;
}

export const createSerieProvider = async (titulo: string, num_episodios: number, serie: ISeriesProps ): Promise<{} | Error> => {
    try {
        const resultSerie: IIdProps = await prisma.serie.create({
            data:  {
                ...serie,
                temporada: {
                    create: {   
                        titulo: titulo,
                        num_episodios: num_episodios
                    }
                },
            },
            select: {id: true}
        });

        if(resultSerie){
            return resultSerie;
        } else {
            return new Error("Erro ao registrar serie");
        }
    } catch (error) {
        console.log(error);
        return new Error("Erro ao registrar serie");
    }
};