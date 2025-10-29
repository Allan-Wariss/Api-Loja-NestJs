import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

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
        this.usuarioRepository.salvar(dadosDoUsuario);
        return dadosDoUsuario
    }

    @Get()
    @ApiOkResponse({ description: 'Lista de usuários' })
    async listUsuarios() {
        return this.usuarioRepository.listar();
    }
}