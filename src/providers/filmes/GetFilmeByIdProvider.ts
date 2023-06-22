import { IFimes } from "../../database/models/Filmes";
import { prisma } from "../../database/prisma";


export const getFilmeByIdProvider =async (id: string): Promise<IFimes | Error> => {
    
   
    try {

        const filme = await prisma.filme.findFirst({
            where: {
                id: id,
            },
            select: { 
                // createAt: false,
                // updateAt: false,
                id: true,
                linguagem: true,
                titulo: true,
                genero: true,
                descricao: true,
                popularidade: true,
                type: true,
                poster: true,
                data: true,
                video: true,
                trailer: true,
                voto_medio: true
            }
        });

        if(filme){
            return filme;
        } else {
            return Error("Erro ao buscar registro");
        }
        
    } catch (error) {
        return Error("Erro ao buscar registro");
    }
};