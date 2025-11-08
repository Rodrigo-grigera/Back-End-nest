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
  
  async getTrackId(id: number): Promise <Track| undefined> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if(!res.ok){
      console.log("Error de solicitud");
    }else{
      const track = await res.json();
      return track
    }
    }
  }

