import { IEpisodios } from "../../database/models/Series";
import { prisma } from "../../database/prisma";

interface IEpisodioProps extends Omit<IEpisodios, "id">{}


export const createEpisodioProvider = async (id: string, episodios: IEpisodioProps[]): Promise<{} | Error> => {
    
    try {
        const episodioExiste = await prisma.temporada.findFirst({
            where: {id: id}
        });

        if(!episodioExiste){
            return Error(`Erro ao registrar epsodio, temporada com id.: ${id} não existe`);
        }

        const result = await prisma.episodio.createMany({
            data: episodios.map(episodio => ({
                titulo: episodio.titulo,
                data: episodio.data,
                descricao: episodio.descricao,
                poster: episodio.poster,
                voto_medio: episodio.voto_medio,
                video: episodio.video,
                temporadaId: id
            }))
        });

        // console.log(result);

        if(result.count > 0){
            return result;
        } else {
            return Error("Erro ao registrar episodio(os)");
        }
        
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Error ao cadastrar episodio(os)");
    }
};