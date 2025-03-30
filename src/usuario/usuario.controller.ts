import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDto } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {

        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha; 
        usuarioEntity.id = uuid();

        await this.usuarioRepository.salvar(usuarioEntity);

        return { 
            usuario: new ListaUsuarioDto(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuario criado com sucesso',
         };
    }

    @Get()
    async listarUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDto(
                usuario.id,
                usuario.nome
            )
        );

        return {
            usuarios: usuariosLista,
            message: 'Lista de usuarios'
        };
    }

    @Put('/:id')
    async atualizaUsuario(@Body() novosDados: AtualizaUsuarioDto, @Param('id') id: string) {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

        return {
            usuario: usuarioAtualizado,
            message: 'Usuario atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async deletaUsuario(@Param('id') id: string) {
        const usuarioDeletado = await this.usuarioRepository.deleta(id);

        return {
            usuario: usuarioDeletado,
            message: 'Usuario deletado com sucesso'
        }
    }
 
}