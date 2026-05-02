import { Injectable } from '@nestjs/common';
import { CreateBarbeariaDto } from './dto/create-barbearia.dto';
import { UpdateBarbeariaDto } from './dto/update-barbearia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barbearia } from './entities/barbearia.entity';

@Injectable()
export class BarbeariasService {
  constructor(
      @InjectRepository(Barbearia)
      private barbeariasRepository: Repository<Barbearia>,
  ) {}

  async create(createBarbeariaDto: CreateBarbeariaDto) {
    const barbearia = this.barbeariasRepository.create(createBarbeariaDto);
    return this.barbeariasRepository.save(barbearia);
  }

  async findAll() {
    return this.barbeariasRepository.find();
  }

  async findOne(id: number) {
    return this.barbeariasRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBarbeariaDto: UpdateBarbeariaDto) {
    await this.barbeariasRepository.update(id, updateBarbeariaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.barbeariasRepository.delete(id);
  }
}
