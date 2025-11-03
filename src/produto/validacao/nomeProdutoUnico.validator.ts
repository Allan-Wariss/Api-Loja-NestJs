import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ProdutoRepository } from "../produto.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class NomeProdutoUnicoValidator implements ValidatorConstraintInterface {

    constructor(private produtoRepository: ProdutoRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const produtoComNomeExiste = await this.produtoRepository.existeComNome(value);
        return !produtoComNomeExiste;
    }
}

export const NomeProdutoUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: NomeProdutoUnicoValidator,
        });
    };
};
