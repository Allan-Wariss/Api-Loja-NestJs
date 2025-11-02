import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid} from "uuid";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@ApiTags('usuarios')
@Controller("/usuarios")
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    @ApiBody({
        type: CriaUsuarioDTO,
        description: 'Corpo esperado para criação de usuário',
        required: true,
    })
    @ApiCreatedResponse({ description: 'Usuário criado com sucesso', type: CriaUsuarioDTO })
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity()

        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);
        return { 
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome, usuarioEntity.email),
            menssage: "Usuário criado com sucesso"
         }
    }

    @Get()
    @ApiOkResponse({ description: 'Lista de usuários' })
    async listUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(usuario => new ListaUsuarioDTO(
            usuario.id,
            usuario.nome,
            usuario.email
        ));

        return usuariosLista;
    }

    @Put('/:id')
    async atualizarUsuario (@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO ){
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

        return {
            usuario: usuarioAtualizado,
            menssage: "Usuario atulizado com sucesso!"
        }
    }

    @Delete("/:id")
    async removeUsuario(@Param("id") id: string){
        const usuarioRemovido = await this.usuarioRepository.delete(id);

                return {
            menssage: `Usuario ${usuarioRemovido.nome} removido com sucesso!`
        }
    }
}