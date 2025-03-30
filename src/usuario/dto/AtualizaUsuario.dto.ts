import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class AtualizaUsuarioDto {

    @IsNotEmpty({
        message: "O nome não pode ser vazio"
    })
    @IsOptional()
    nome: string;

    @IsEmail(undefined, {
        message: "O email não é válido"
    })
    @IsOptional()
    @EmailEhUnico({
        message: "Já existe um usuário com esse email"})
    email: string;

    @IsOptional()
    @MinLength(6, {
        message: "A senha deve ter no mínimo 6 caracteres"
    })
    senha: string;
}