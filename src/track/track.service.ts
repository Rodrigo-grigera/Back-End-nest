import { Injectable } from '@nestjs/common';
import { Track } from '../track/track.interface';
import { resolveSoa } from 'dns';
import { matchesGlob } from 'path';


const BASE_URL = "http://localhost:3001/tracks"

@Injectable()
export class TrackService {

async getTracks(): Promise <Track[]> {
    const resp = await fetch(BASE_URL);
    const allTracks = await resp.json()
    return allTracks; 
  }
  
  async getTrackId(id): Promise <Track |undefined> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if(!res.ok){
      console.log("Error de solicitud");
    }else{
      const track = await res.json();
      return track
    }
    }

  async createTrack(track:Track): Promise <any>{
       const res = await fetch(BASE_URL, {
        method: "POST",
        headers:{  
          "Content-Type": "application/json"
          }, 
          body: JSON.stringify(track)
       });
       console.log(`Se Agrego track: "${track.nombre}" a la lista`)
    }

    async delete(id:string): Promise<void>{
       const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
       });
      const endRespon = await res.json()
      return endRespon
    }

    async update(id: string, body: Track): Promise<void>{

      const isTrack = await this.getTrackId(id);
      if(!isTrack){
        throw new Error("Track no encontrado");
      }
      const update = {...body,id}

      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers:{  
          "Content-Type": "application/json"
          }, 
          body: JSON.stringify(update)
       });
      const endRespon = await res.json()
      return endRespon
    }
    /*con patch es lo mismo que put pero no es necesario parsar todo el objeto,
    solo modificas las propiedades que se quiere, en el codigo solo cambiamos el metodo que
    pasamos en el fetch de la url "method: "PATCH" */

    async updatePatch(id:string, body:Track): Promise<void>{
      const isTrack = await this.getTrackId(id);
      if(!isTrack){
         throw new Error("Track no encontrado");
      }
        const update = {...body,id}

       const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers:{  
          "Content-Type": "application/json"
          }, 
          body: JSON.stringify(update)
       });
        const endRespon = await res.json()
        return endRespon
    }
  }


