import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { responseDTO } from '../dto/responseDTO';

@Injectable()
export class ArtistService {
  constructor(@InjectRepository(Artist)private readonly artistRepository : Repository <Artist>){}

  async create(createArtist: ArtistDto): Promise <responseDTO> {
    const createOneArtist = this.artistRepository.create(createArtist);
    const newArtist = await this.artistRepository.save(createOneArtist);
    return {
            message: `Nuevo Artista creado`,
            code: HttpStatus.CREATED ,
            data : newArtist

    };
  }

  async findAll() : Promise <responseDTO> {
    const resp = await this.artistRepository.find();
    if(!resp) throw new NotFoundException("No existen Archivos")
    return{
            message: `Todos los Artistas`,
            code: HttpStatus.OK ,
            data : resp
          }
  }

  async findOne(artist_id: string): Promise <responseDTO> {
    const Artist = await this.artistRepository.findOneBy({artist_id})
    if(!Artist) throw new NotFoundException(`Artista no encontrado`)
    return {  
            message: `Artista encontrado`,
            code: HttpStatus.OK ,
            data : Artist
  
    };
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise <responseDTO> {
    const updateArtis = await this.artistRepository.update(id,updateArtistDto);
    if(!updateArtis.affected) throw new NotFoundException("No se modifico el artista");
    return{
          message: "Artista modificado",
          code: HttpStatus.NO_CONTENT,
    }
  }

  async remove(id: string): Promise <responseDTO> {
    const removeArtis = await this.artistRepository.delete(id)
    if(!removeArtis.affected) throw new NotFoundException(`No se encontro artista`)
    return {
          message: "Artista eliminado",
          code: HttpStatus.NO_CONTENT,
    }
  }
}
