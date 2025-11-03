import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository {
    private produtos: ProdutoEntity[] = [];

    async salvar(produto: ProdutoEntity) {
        this.produtos.push(produto);
    }

    async listar() {
        return this.produtos;
    }

    async existeComNome(nome: string) {
        const possivelProduto = this.produtos.find(produto => produto.nome === nome);
        return possivelProduto !== undefined;
    }

    private buscarPorId(id: string) {
        const possivelProduto = this.produtos.find(produtoSalvo => produtoSalvo.id === id);

        if (!possivelProduto) {
            throw new Error("Produto não existe!");
        }

        return possivelProduto;
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
        const produto = this.buscarPorId(id);

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === "id") {
                return;
            }
            if (valor === undefined) {
                return;
            }
            // @ts-ignore - index assignment by key
            produto[chave] = valor as any;
        });
        return produto;
    }

    async delete(id: string) {
        const produto = this.buscarPorId(id);
        this.produtos = this.produtos.filter(produtoSalvo => produtoSalvo.id !== id);
        return produto;
    }
}
