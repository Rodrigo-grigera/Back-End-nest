import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumnDto } from './dto/create-albumn.dto';
import { UpdateAlbumnDto } from './dto/update-albumn.dto';
import { responseDTO } from '../dto/responseDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Albumn } from './entities/albumn.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumnService {

  constructor(@InjectRepository(Albumn) private readonly albumRepositori : Repository <Albumn>){}


  async create(createAlbumnDto: CreateAlbumnDto): Promise <responseDTO> {
    const createOne = this.albumRepositori.create(createAlbumnDto);
    const resp = await this.albumRepositori.save(createOne);
    if(!resp) throw new NotFoundException('Eror al crear el albumn')
    return {
            message: 'Albumn agregado con exito',
            code: HttpStatus.CREATED,
            data: resp
    }
  };

  async findAll() : Promise <responseDTO> {
    const resp = await this.albumRepositori.find();
    if(!resp.length) throw new NotFoundException('Albumn no encontrado')
    return {
            message: 'Todos los albumns',
            code: HttpStatus.OK,
            data: resp
    };
  };

  async findOne(id: string): Promise <responseDTO> {
    const oneAlbum = await this.albumRepositori.findOneBy({albumn_id : id})
    if(!oneAlbum) throw new NotFoundException('No se encontro albumn');
    return {
            message: 'Albumn encontrado',
            code: HttpStatus.OK,
            data: oneAlbum
    }; 
  };

  async update(id: string, updateAlbumnDto: UpdateAlbumnDto): Promise <responseDTO> {
    const updateOne = await this.albumRepositori.update({albumn_id:id}, updateAlbumnDto);
    if (!updateOne.affected) throw new NotFoundException ('Error al modificar albumn');
    return{
            message: 'Albumn modificado con exito',
            code: HttpStatus.NO_CONTENT
    };
  }

  async remove(id: string): Promise <responseDTO> {
    const resp = await this.albumRepositori.delete({albumn_id : id});
    if(!resp.affected) throw new NotFoundException ('Error al elimanr el albumn');
    return{
            message: 'Albumn eliminado',
            code: HttpStatus.NO_CONTENT
    } ;
  };
}
