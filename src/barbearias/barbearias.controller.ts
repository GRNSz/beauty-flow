import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { BarbeariasService } from './barbearias.service';
import { CreateBarbeariaDto } from './dto/create-barbearia.dto';
import { UpdateBarbeariaDto } from './dto/update-barbearia.dto';

@Controller('barbearias')
export class BarbeariasController {
  constructor(private readonly barbeariasService: BarbeariasService) {}

  @Post('/cadastrarbarbearia')
  async create(@Body() createBarbeariaDto: CreateBarbeariaDto) {
    try {
      return await this.barbeariasService.create(createBarbeariaDto);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao criar barbearia: ' + msg);
    }
  }

  @Get('/listarbarbearias')
  async findAll() {
    try {
      return await this.barbeariasService.findAll();
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao listar barbearias: ' + msg);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.barbeariasService.findOne(+id);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao encontrar barbearia: ' + msg);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBarbeariaDto: UpdateBarbeariaDto) {
    try {
      return await this.barbeariasService.update(+id, updateBarbeariaDto);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao atualizar barbearia: ' + msg);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.barbeariasService.remove(+id);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Erro ao remover barbearia: ' + msg);
    }
  }
}
