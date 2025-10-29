import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioRepository {
    private usuarios: any[] = [];

    async salvar(usuario: any){
        this.usuarios.push(usuario);
    }

    async listar(){
        return this.usuarios;
    }

    async existeComEmail(email: string){
        const possivelUsario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsario !== undefined;
    }
}