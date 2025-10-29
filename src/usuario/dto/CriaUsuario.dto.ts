import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CriaUsuarioDTO {

    @IsString({message:"nome tem que ser string"})
    @IsNotEmpty({message:"nome Não pode ser vazio"})
    nome: string;

    @IsEmail(undefined, {message:"Email invalido"})
    email: string;
    
    @MinLength(6, {message:"A senha precisa ter pelo menos 6 caracteres"})
    senha: string;

}