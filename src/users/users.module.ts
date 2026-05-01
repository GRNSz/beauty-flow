import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
//import { DataSource } from 'typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
}
