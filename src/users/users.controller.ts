import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { response } from 'express';
import { ResponseUserDto } from './dto/response-user.dto';

//TODO - Não expor senha nas respostas da API (ex: usando class-transformer + @Exclude para excluir o campo senha ou criando um DTO específico para respostas)

//TODO - Implementar autenticação e autorização (ex: usando JWT para autenticação e guardas para proteger rotas, além de implementar controle de acesso baseado em funções/níveis de permissão e Auth Module para gerenciar autenticação e autorização de forma centralizada)

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/cadastrarusuario')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto)
      return user;

      // const response = await this.usersService.create(createUserDto, new ResponseUserDto());
      // return response;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao criar usuário: ' + msg);
    }
  }

  @Get('/perfil/:id')
  async getPerfil(@Param('id') id: number): Promise<ResponseUserDto> {
    try {
      const userProfile = await this.usersService.getPerfil(id);
      return userProfile;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String('O perfil do usuário não pôde ser encontrado: ');
      throw new BadRequestException(msg);
    }
  }

  @Get('/listarusuarios')
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao listar usuários: ' + msg);
    }
  }

  @Get('/buscarusuario/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao buscar usuário: ' + msg);
    }
  }

  @Patch('/atualizarusuario/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao atualizar usuário: ' + msg);
    }
  }

  @Delete('/excluirusuario/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(+id);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao excluir usuário: ' + msg);
    }
  }
}

