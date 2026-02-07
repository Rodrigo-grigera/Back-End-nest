import { Controller, Get, Post, Param, Body, Delete, Put, Patch  } from '@nestjs/common';
import { TrackService } from './track.service';
import { type Track } from '../track/track.interface';




@Controller("tracks")
export class TrackController {
    constructor(private readonly trackService: TrackService){}

      @Get()
        getTracksAll(): Promise <Track[]> {
        return  this.trackService.getTracks();
      }
      @Get(":id")
        getById(@Param('id') id: string): Promise <Track|undefined> {
        return this.trackService.getTrackId(id);
      }
      @Post()
        create(@Body() track: Track): Promise<void>{
          return this.trackService.createTrack(track)
        }
      @Delete(":id")
        delete(@Param("id") id:string): Promise<void>{
          return this.trackService.delete(id)
        }
      
      @Put()
        update(@Param(":id") id:string, @Body() body: Track): Promise<any>{
          return  this.trackService.update(id,body)
        }

      @Patch()
        updatePatch(@Param(":id") id:string, @Body()body: Track ): Promise<any>{
          return this.trackService.updatePatch(id,body);
        }
      
}




