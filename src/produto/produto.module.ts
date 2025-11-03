import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.repository";
import { NomeProdutoUnicoValidator } from "./validacao/nomeProdutoUnico.validator";

@Module({
    controllers: [ProdutoController],
    providers: [ProdutoRepository, NomeProdutoUnicoValidator]
})
export class produtoModule {}
