import { Controller, Get, Post, Query, Param, Req  } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from '../track/track.interface';


@Controller("tracks")
export class TrackController {
    constructor(private readonly trackService: TrackService){}

      @Get()
        getTracksAll(): Promise <Track[]> {
        return this.trackService.getTracks();
      }
      @Get(":id")
        getId(@Param('id') id: string): Promise <Track | undefined> {
        return this.trackService.getTrackId(Number(id));
      }
}


