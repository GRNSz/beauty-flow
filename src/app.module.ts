import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BarbeariasModule } from './barbearias/barbearias.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [UsersModule, BarbeariasModule, PedidosModule, 
  
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'beautyflow',
    synchronize: true,
    autoLoadEntities: true,
    //entities: [__dirname + '/**/*.entity{.ts,.js}'],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
