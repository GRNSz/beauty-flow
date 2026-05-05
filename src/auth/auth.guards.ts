import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate { 
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException('Token de autenticação não fornecido');
		}
		try {
			const payload = this.jwtService.verifyAsync(token);
			request['user'] = payload;
		} catch {
			throw new UnauthorizedException('Token de autenticação inválido');
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const auth = (request.headers['authorization'] ?? request.get('authorization')) as string | undefined;
		const [type, token] = auth?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}