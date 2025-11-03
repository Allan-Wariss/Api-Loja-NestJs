import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { NomeProdutoUnico } from "../validacao/nomeProdutoUnico.validator";

export class CriaProdutoDTO {

    @ApiProperty({ description: 'Nome do produto', example: 'Teclado Mecânico' })
    @IsString({ message: "nome tem que ser string" })
    @IsNotEmpty({ message: "nome não pode ser vazio" })
    @NomeProdutoUnico({ message: "Já existe um produto com este nome!" })
    nome: string;

    @ApiProperty({ description: 'Descrição do produto', example: 'Teclado mecânico com switches azuis' })
    @IsString({ message: "descricao tem que ser string" })
    @IsNotEmpty({ message: "descricao não pode ser vazia" })
    descricao: string;

    @ApiProperty({ description: 'Preço do produto', example: 299.9, minimum: 0.01, type: Number })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "preco deve ser número" })
    @IsPositive({ message: "preco deve ser maior que zero" })
    preco: number;

    @ApiProperty({ description: 'Quantidade em estoque', example: 10, minimum: 0, type: Number })
    @IsInt({ message: "quantidade deve ser inteiro" })
    @Min(0, { message: "quantidade não pode ser negativa" })
    quantidade: number;
}
