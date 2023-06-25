import {IEpisodios, ITemporadaReturn } from "../../database/models/Series";
import { prisma } from "../../database/prisma";


interface ITemporadaProps extends Omit<ITemporadaReturn, "id" | "episodios">{
    serieId: string;
}


export const createTemporadaProvider = async (temporada: ITemporadaProps, episodios?: Omit<IEpisodios[], "id"> ): Promise<{} | Error> => {

    const { serieId} = temporada;
    try {

        const serieExist = await prisma.serie.findFirst({
            where: {id: serieId}
        });

        if(!serieExist){
            return Error(`Erro ao registrar temporada, serie com id.: ${serieId} não existe`);
        }

        const result = await prisma.temporada.create({
            data: {
                ...temporada,
                episodios:  episodios && episodios.length > 0 ? { //VALIDA CASO O EPISODIOS EXISTA ELE E CRIADO JUNTO COM A SERIE
                    createMany: {
                        data: episodios.map(episodio => ({
                            titulo: episodio?.titulo,
                            descricao: episodio?.descricao,
                            data: episodio?.data,
                            poster: episodio?.poster,
                            voto_medio: episodio?.voto_medio,
                            video: episodio?.video,
                        }))
                    }
                } : undefined
            },
            select: {
                id: true,
            }
        });

        if(result){
            return result;
        } else {
            return Error("Erro ao registrar temporada");
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao registrar temporada");
    }
};