import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
	private usersService: UsersService,
	private jwtService: JwtService
) {}

  async signIn(email: string, senha: string): Promise<SignInDto> {
	const user = await this.usersService.findByEmail(email);
	if (!user) {
		throw new UnauthorizedException('Credenciais inválidas');
	}
	const isSenhaValid = await bcrypt.compare(senha, user.senha);
	if (!isSenhaValid) {
		throw new UnauthorizedException('Credenciais inválidas');
	}
	const payload = { email: user.email, sub: user.id, senha: user.senha };
	return {
		access_token: this.jwtService.sign(payload),
	}; 
  }
}
