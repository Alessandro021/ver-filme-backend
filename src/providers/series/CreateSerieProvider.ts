import { IEpisodios, ISerie } from "../../database/models/Series";
import { prisma } from "../../database/prisma";


type ISeriesProps = Omit<ISerie, "id" | "titulo_temporada" | "num_episodios" | "episodios">

interface IIdProps{
    id: string;
}

export const createSerieProvider = async (titulo: string, num_episodios: number, serie: ISeriesProps, episodios?: Omit<IEpisodios[], "id"> ): Promise<{} | Error> => {

    if(episodios?.length === 0) {
        episodios = [];
    } 

    try {
        const resultSerie: IIdProps = await prisma.serie.create({
            data:  {
                ...serie,
                temporada: {
                    create: {   
                        titulo: titulo,
                        num_episodios: num_episodios,
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