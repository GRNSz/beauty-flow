import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';

//TODO - Implementar validação de dados (ex: email válido, senha forte, etc. e Bcrypt para hash de senha); 
// Concluída a implementação de hash de senha usando Bcrypt no método create do UsersService e adicionado class-validator no CreateUserDto.

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, /*responseUserDto: ResponseUserDto*/) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);
      const user = this.usersRepository.create({
        ...createUserDto, /*...responseUserDto,*/
        senha: hashedPassword,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (error) {
      throw new Error('Erro ao listar usuários: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  async findOne(id: number) {
    try {
      return this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.update(id, updateUserDto);
      return this.findOne(id);
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.delete(id);
      return this.findOne(id);
    } catch (error) {
      throw new Error('Erro ao remover usuário: ' + (error instanceof Error ? error.message : String(error)));
    }
  }
}
