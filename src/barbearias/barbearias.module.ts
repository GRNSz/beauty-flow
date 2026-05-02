import { Module } from '@nestjs/common';
import { BarbeariasService } from './barbearias.service';
import { BarbeariasController } from './barbearias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barbearia } from './entities/barbearia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barbearia])],
  controllers: [BarbeariasController],
  providers: [BarbeariasService],
})
export class BarbeariasModule {}
