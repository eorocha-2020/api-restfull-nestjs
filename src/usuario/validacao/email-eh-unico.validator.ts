import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

    constructor(private usuarioRepository: UsuarioRepository) {}

    async validate(value: any): Promise<boolean> {
        const usuarioComEmailExistet = await this.usuarioRepository.existeComEmail(value);
        return !usuarioComEmailExistet;
    }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return  (objeto: object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        })
    }
}