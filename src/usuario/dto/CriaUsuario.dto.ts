import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EmailUnico } from "../validacao/emailUnico.validator";

export class CriaUsuarioDTO {

    @ApiProperty({ description: 'Nome completo do usuário', example: 'Maria Silva' })
    @IsString({message:"nome tem que ser string"})
    @IsNotEmpty({message:"nome Não pode ser vazio"})
    nome: string;

    @ApiProperty({ description: 'Email do usuário', example: 'maria@example.com', format: 'email' })
    @IsEmail(undefined, {message:"Email invalido"})
    @EmailUnico({message: "Já existe um usuario com este email!"})
    email: string;
    
    @ApiProperty({ description: 'Senha de acesso (mín. 6 caracteres)', minLength: 6, example: 'segredo123' })
    @MinLength(6, {message:"A senha precisa ter pelo menos 6 caracteres"})
    senha: string;

}