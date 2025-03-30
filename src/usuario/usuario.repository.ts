import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
        console.log(this.usuarios);
    }

    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );
        return possivelUsuario !== undefined;
    }

    async atualiza(id: string, novosDados: Partial<UsuarioEntity>) {
        const usuario = this.usuarios.find(usuario => usuario.id === id);

        if (!usuario) {
            throw new Error('Usuario não encontrado');
        }

        Object.entries(novosDados).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            usuario[chave] = valor;
        });

        return usuario;
    }

    async deleta(id: string) {
        const usuario = this.usuarios.find(usuario => usuario.id === id);

        if (!usuario) {
            throw new Error('Usuario não encontrado');
        }

        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);

        return usuario;
    }
}