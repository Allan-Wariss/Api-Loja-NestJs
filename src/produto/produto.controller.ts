import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uuid } from "uuid";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@ApiTags('produtos')
@Controller('/produtos')
export class ProdutoController {
    constructor(private produtoRepository: ProdutoRepository) {}

    @Post()
    @ApiBody({
        type: CriaProdutoDTO,
        description: 'Corpo esperado para criação de produto',
        required: true,
    })
    @ApiCreatedResponse({ description: 'Produto criado com sucesso', type: CriaProdutoDTO })
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        produtoEntity.id = uuid();
        produtoEntity.nome = dadosDoProduto.nome;
        produtoEntity.descricao = dadosDoProduto.descricao;
        produtoEntity.valor = dadosDoProduto.valor;
        produtoEntity.quantidade = dadosDoProduto.quantidade;

        await this.produtoRepository.salvar(produtoEntity);

        return {
            produto: new ListaProdutoDTO(produtoEntity.id, produtoEntity.nome, produtoEntity.valor),
            menssage: 'Produto criado com sucesso',
        };
    }

    @Get()
    @ApiOkResponse({ description: 'Lista de produtos' })
    async listaProdutos() {
        const produtosSalvos = await this.produtoRepository.listar();
        return produtosSalvos.map(
            (produto) => new ListaProdutoDTO(produto.id, produto.nome, produto.valor)
        );
    }

    @Put('/:id')
    async atualizarProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
        const produtoAtualizado = await this.produtoRepository.atualiza(id, novosDados);
        return {
            produto: produtoAtualizado,
            menssage: 'Produto atualizado com sucesso!'
        };
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string) {
        const produtoRemovido = await this.produtoRepository.delete(id);
        return {
            menssage: `Produto ${produtoRemovido.nome} removido com sucesso!`,
        };
    }
}
