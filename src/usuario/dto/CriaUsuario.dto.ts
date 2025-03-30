import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class CriaUsuarioDto {

    @IsNotEmpty({
        message: "O nome não pode ser vazio"
    })
    nome: string;

    @IsEmail(undefined, {
        message: "O email não é válido"
    })
    @EmailEhUnico({
        message: "Já existe um usuário com esse email"})
    email: string;

    @MinLength(6, {
        message: "A senha deve ter no mínimo 6 caracteres"
    })
    senha: string;
}