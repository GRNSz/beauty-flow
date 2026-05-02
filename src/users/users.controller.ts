import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/cadastrarusuario')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao criar usuário: ' + msg);
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

