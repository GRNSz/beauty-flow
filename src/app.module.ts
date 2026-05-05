import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BarbeariasModule } from './barbearias/barbearias.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

// Para produção, desativar synchronize: true e usar migrations para controle de versão do banco de dados, garantindo maior segurança e controle sobre as alterações no esquema do banco de dados.

//TODO - Adicionar validação das variáveis de ambiente usando @nestjs/config + Joi para validar, db, jwt secret, PORT e etc. garantindo que a aplicação tenha as configurações necessárias para rodar corretamente e de forma segura, além de evitar erros de configuração em tempo de execução.

@Module({
  imports: [UsersModule, BarbeariasModule, PedidosModule, 
    
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), 
  
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    autoLoadEntities: true,
    //entities: [__dirname + '/**/*.entity{.ts,.js}'],
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
