import { Injectable } from '@nestjs/common';
import { Track } from '../track/track.interface';


const BASE_URL = "http://localhost:3001/tracks"

@Injectable()
export class TrackService {

async getTracks(): Promise <Track[]> {
    const resp = await fetch(BASE_URL);
    const allTracks = await resp.json()
    return allTracks; 
  }
  
  async getTrackId(id): Promise <Track| undefined> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if(!res.ok){
      console.log("Error de solicitud");
    }else{
      const track = await res.json();
      return track
    }
    }

  async createTrack(track:Track){
       const res = await fetch(BASE_URL, {
        method: "POST",
        headers:{  
          "Content-type": "application-json"
          }, 
          body: JSON.stringify(track)
       });
       return `Se Agrego track: "${track.nombre}" a la lista`
    }

    async delete(id:string): Promise<void>{
       const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
 
       });
      const endRespon = res.json()
      return endRespon
    }

    async update(id: string, body: Track): Promise<any>{
      const isTrack = await this.getTrackId(id);
      const update = {...body,id}
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers:{  
          "Content-type": "application-json"
          }, 
          body: JSON.stringify(update)
       });
      const endRespon = res.json()
      return endRespon
    }
  }

