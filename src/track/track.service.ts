import { BadRequestException, ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { responseDTO } from '../dto/responseDTO';
import { TrackDTO } from '../dto/trackDTO';
import { InjectRepository} from '@nestjs/typeorm';
import { trackEntity } from './track.entity';
import { Artist } from '.././artist/entities/artist.entity';
import { Albumn } from '.././albumn/entities/albumn.entity';



const BASE_URL = "http://localhost:3001/tracks"

@Injectable()
export class TrackService {

  constructor(@InjectRepository(trackEntity)private readonly trackRepository : Repository <trackEntity>,
              @InjectRepository(Artist)private readonly artisRepository : Repository <Artist>,
              @InjectRepository(Albumn) private readonly albumRepository : Repository <Albumn>
            ){} 
// con este constructor hacemos que nuestros metodos puedan interactuar con nuestra base de datos y no con un json que simule la base de datos 
// typeorm nos provee un tipado (repository) al que le pasamos nuestra entidad y asi interactua 

async getTracks(): Promise <TrackDTO | responseDTO>{
    const tracks = await this.trackRepository.find(); //find es como decir select * from tracks
    if(!tracks.length)
      throw new NotFoundException("No hay tracks")
        return {
        code: HttpStatus.OK,
        message: "Todos los tracks",
        data: tracks
    }
 
 } 

//forma de traer datos con json, simulando base de datos

// async getTracks(): Promise <TrackDTO[] | responseDTO> {
//     const resp = await fetch(BASE_URL);
//     if(!resp.ok) throw new NotFoundException("No hay tracks");
//     else{
//       const allTracks = await resp.json()
//       return allTracks; 
//     } 
//   }
  
  async getTrackId(track_id:string): Promise <responseDTO> {
    
      // const res = await fetch(`${BASE_URL}/${id}`); //get desde jspn (simulando una base de datos)
      const res = await this.trackRepository.findOneBy({track_id})
      
      // if(!res.ok){
      //   throw new myExeption("Track no existe",HttpStatus.NOT_FOUND) //las exepciones vienen predeterminadas como el resp-dto pero pasamos el msj
      // }else{
        // const track = await res.json();
        if(!res){ 
          throw new NotFoundException("No se encontro track")
        }
        return{
          message: "track encontrado",
          code: HttpStatus.OK,
          data: res
        }
        
        // }
  
    }

    /*Forma de hacerlo con nuestar base de datos mysql */
    
     async createTrack(body: TrackDTO): Promise <trackEntity> {
      try {
        
        //PARA CREAR UN TRACK tiene que tener un artista, debemos validar si hay un artista
      if(!body.artistaIds || body.artistaIds.length === 0){
        throw new BadRequestException('Debe proporcionar al menos 1 artista')
      }
      
      //validar si existe el artista
      const artists = await this.artisRepository.find({
          where:{artist_id: In(body.artistaIds)}
          //In es operador de sql que nos permite ver si un valor esta dentro de una lista de valores
        })
        if(!artists.length){
          throw new NotFoundException('No se encontro artista')
        }

        //buscar y validar si el album (si lo pasaron) existe . Este parametro es opcionar en trackEntity
        let album : Albumn | null = null
        if(body.albumnIds){
         album = await this.albumRepository.findOne({
          where: {albumn_id : In(body.albumnIds)}
         })
        }
        if(!album){
          throw new NotFoundException('Albun not found')
        }
        
        // validar si el album existe y si existe que no se repita ese numero de track
        
        if(body.trackNUM && body.albumnIds){
          const exiteTrack = await this.trackRepository.findOne({
            where:{
              album :{albumn_id : In(body.albumnIds)},
              trackNUM : body.trackNUM
            }
          })

          if(exiteTrack){
            throw new ConflictException('Numero de track ya existe en el albumn') 
          }
        }
      //crear el track
        const {artistaIds, albumnIds, ...trackData} = body;
        const trackOne = this.trackRepository.create({
          artists, album, ...trackData
        })

        //Guardar el resultado
        const saveTrack = await this.trackRepository.save(trackOne)
        const foundTrack = await this.trackRepository.findOne({
          where : {track_id: saveTrack.track_id},
          relations : ['artists', 'albumn']
        })
        if(!foundTrack) throw new NotFoundException('Track not found')

        return foundTrack;

  } catch (error) {
    throw new InternalServerErrorException('Fallo la creacion de track')
  }
}
    async delete(id: number): Promise <responseDTO> {
      const resp = await this.trackRepository.delete(id);
      if(!resp.affected) throw new NotFoundException(`No se encontro track ${id}`);
       return{
          message: "track eliminado",
          code: HttpStatus.NO_CONTENT,
          
        }
      
    }
    async update(id: string, body: TrackDTO): Promise <responseDTO> {
      const update = await this.trackRepository.update(id, body);
       if(!update.affected) throw new NotFoundException("Track no encontrado")
       return{
          message: "track actualizado",
          code: HttpStatus.NO_CONTENT,
        }
    }
    async updatePatch (id: string, body: Partial <TrackDTO>): Promise <responseDTO> {
      const updateTrack = await this.trackRepository.update(id, body)
      if(!updateTrack.affected) throw new NotFoundException("Track no encontrado")
       return{
          message: "track actualizado",
          code: HttpStatus.NO_CONTENT,
        }
    }

    /*Forma de hacerlo simulando una base de dato con json server */

  // async createTrack(track:TrackDTO): Promise <any>{
  //      const res = await fetch(BASE_URL, {
  //       method: "POST",
  //       headers:{  
  //         "Content-Type": "application/json"
  //         }, 
  //         body: JSON.stringify(track)
  //      });
  //      return (`Se Agrego track: "${track.nombre}" a la lista`)
  //   }

  //   async delete(id:string): Promise<void>{
  //      const res = await fetch(`${BASE_URL}/${id}`, {
  //       method: "DELETE",
  //      });
  //     const endRespon = await res.json()
  //     return endRespon
  //   }

  //   async update(id: number, body: TrackDTO): Promise<void>{

  //     const isTrack = await this.getTrackId(id);
  //     if(!isTrack){
  //       throw new Error("Track no encontrado");
  //     }
  //     const update = {...body,id}

  //     const res = await fetch(`${BASE_URL}/${id}`, {
  //       method: "PUT",
  //       headers:{  
  //         "Content-Type": "application/json"
  //         }, 
  //         body: JSON.stringify(update)
  //      });
  //     const endRespon = await res.json()
  //     return endRespon
  //   }
  //   /*con patch es lo mismo que put pero no es necesario parsar todo el objeto,
  //   solo modificas las propiedades que se quiere, en el codigo solo cambiamos el metodo que
  //   pasamos en el fetch de la url "method: "PATCH" */

  //   async updatePatch(id:number, body:TrackDTO): Promise<void>{
  //     const isTrack = await this.getTrackId(id);
  //     if(!isTrack){
  //        throw new Error("Track no encontrado");
  //     }
  //       const update = {...body,id}

  //      const res = await fetch(`${BASE_URL}/${id}`, {
  //       method: "PATCH",
  //       headers:{  
  //         "Content-Type": "application/json"
  //         }, 
  //         body: JSON.stringify(update)
  //      });
  //       const endRespon = await res.json()
  //       return endRespon
  //   }
  }


