import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';


//TODO - Configurar validação global de entrada (ex: usando ValidationPipe para validar DTOs e transformar payloads de requisição em instâncias de classes)

// Podendo utilizar também o ValidationPipe para sanitização de dados (ex: usando transform: true para transformar payloads de requisição em instâncias de classes e whitelist: true para remover propriedades não definidas nos DTOs)

// E whitelist: true, forbidenNonWhitelisted: true, e class-validator nos DTOs para garantir que apenas os campos definidos nos DTOs sejam aceitos e que campos adicionais sejam rejeitados, aumentando a segurança da API

//TODO - Adicionar proteções HTTP com Helmet e configurar CORS com origem restrita e habilitar express-rate-limit para limitar o número de requisições por IP, prevenindo ataques de força bruta e DDoS

//TODO - limitar tamanho do body com express.json({ limit: '100kb' }) para evitar ataques de payloads grandes

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(process.env.PORT));
}
bootstrap();
