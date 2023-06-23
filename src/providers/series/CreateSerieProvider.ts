import { ISerie } from "../../database/models/Series";
import { prisma } from "../../database/prisma";


type ISeriesProps = Omit<ISerie, "id"|"titulo_temporada">

interface IIdProps{
    id: string;
}

export const createSerieProvider = async (titulo: string, serie: ISeriesProps ): Promise<{} | Error> => {
    try {
        const resultSerie: IIdProps = await prisma.serie.create({
            data:  {
                linguagem: String(serie.linguagem),
                titulo: serie.titulo,
                descricao: serie.descricao,
                popularidade: Number(serie.popularidade),
                genero: serie.genero,
                poster: serie.poster,
                data: serie.data,
                video: String(serie.video),
                trailer: String(serie.trailer),
                voto_medio: serie.voto_medio,
                titulo_temporada: {
                    create: {
                        titulo: titulo
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