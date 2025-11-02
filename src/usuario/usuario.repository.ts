import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const possivelUsario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsario !== undefined;
    }

    private buscarPorId(id: string) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        )

        if (!possivelUsuario) {
            throw new Error("Usuário não existe!")
        }

        return possivelUsuario;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {

        const usuario = this.buscarPorId(id)

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === "id") {
                return;
            }

            if (valor === undefined) {
                return;
            }
            usuario[chave] = valor;
        });
        return usuario;
    }


    async delete(id: string) {
        const usuario = this.buscarPorId(id)

        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return usuario;
    }
}