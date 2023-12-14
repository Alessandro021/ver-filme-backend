import { IUsuario } from "../../database/models/Usuarios";
import { prisma } from "../../database/prisma";
import { loginJwt } from "../../services/ServicoJWT";
import { descriptografarSenha } from "../../services/VerificarSenha";

interface IUsuarioProps extends Omit<IUsuario, "id" | "nome">{}

export const entrarProvider = async (usuario: IUsuarioProps): Promise<{} | Error> => {
    try {
        const usuarioExiste = await prisma.usuario.findUnique({
            where: { email: usuario.email}
        });

        if(!usuarioExiste?.email){
            return Error("UNAUTHORIZED");
        }

        const comparaSenha = await descriptografarSenha(usuario.senha, usuarioExiste.senha);

        if(comparaSenha){
            const accessToken = loginJwt({uid: usuarioExiste.id});
            if(accessToken === "JWT_SECRET_NOT_FOUND"){
                return Error("Erro ao gerar token JWT");
            }
            return {accessToken: accessToken};
        } else {
            return Error("UNAUTHORIZED");
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return Error("Erro ao tentar fazer login!");
    } finally {
        await prisma.$disconnect();
    }
};