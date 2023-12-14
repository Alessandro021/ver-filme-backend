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
                categoria: true,
                titulo: true,
                genero: true,
                descricao: true,
                popularidade: true,
                type: true,
                imagem_fundo: true,
                poster: true,
                data: true,
                file: true,
                treiler: true,
                voto_medio: true,
                duracao: true,
            }
        });

        if(filme){
            return filme;
        } else {
            return Error("Houve um erro ao buscar filme");
        }
        
    } catch (error) {
        return Error("Erro ao buscar filme");
    } finally {
        await prisma.$disconnect();
    }
};