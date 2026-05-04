import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResponseUserDto extends PartialType(CreateUserDto) {
  
  @Expose()
  id!: number;

  @Expose()
  nome!: string;

  @Expose()
  telefone!: string;

  @Expose()
  email!: string;

  @Expose()
  isActive!: boolean;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}