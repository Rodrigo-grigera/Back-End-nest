import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { responseDTO } from '../dto/responseDTO';
import { TrackDTO } from '../dto/trackDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { trackEntity } from './track.entity';

const BASE_URL = "http://localhost:3001/tracks"

@Injectable()
export class TrackService {

  constructor(@InjectRepository(trackEntity)private readonly trackRepository : Repository <trackEntity>){}
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
    
     async createTrack(track: TrackDTO): Promise <responseDTO> {
      const newTrack = this.trackRepository.create(track)
      const res = await this.trackRepository.save(newTrack)
      return{
          message: "track creado",
          code: HttpStatus.CREATED,
          data: res
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


