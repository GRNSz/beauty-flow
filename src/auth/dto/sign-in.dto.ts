import { JwtSecretRequestType } from '@nestjs/jwt';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {

  @IsNotEmpty()
  access_token!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
  
  @IsNotEmpty()
  senha!: string;
}