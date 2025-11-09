import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailUnicoValidator } from "./validacao/emailUnico.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioService } from "./usuario.sevice";
import { UsuarioEntity } from "./usuario.entity";

@Module({
    imports:[TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, EmailUnicoValidator]
})
export class usuarioModule {

}