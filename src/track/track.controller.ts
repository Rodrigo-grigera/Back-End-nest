import { Controller, Get, Post, Param, Body, Delete, Put, Patch, HttpCode, HttpStatus, Res, ParseIntPipe, ParseUUIDPipe  } from '@nestjs/common';
import { TrackService } from './track.service';
import { responseDTO } from '../dto/responseDTO';
import { TrackDTO } from '../dto/trackDTO';
import { trackEntity } from './track.entity';

@Controller("tracks")
export class TrackController {
    constructor(private readonly trackService: TrackService){}

      @Get()
      //  @HttpCode(200) //asi mostramos en postman el codigo de respuesta
        getTracksAll(): Promise <TrackDTO|responseDTO> {
        return  this.trackService.getTracks();
      }
      @Get(":id")
      getById(@Param("id") id: string): Promise <TrackDTO|responseDTO>{
        return this.trackService.getTrackId(id);
      }
      // @HttpCode(204)
      //otra manera es con enum.@HttpCode(HttpStatus.NO_CONTENT)
      // async getById(@Res() res:Response ,@Param('id') id: string): Promise <any> {
      //     const response : responseDTO = await this.trackService.getTrackId(id) ; //de esta manera controlamos la respuesta de forma dinamica con decorador @res
      //     res.status(response.code).json(response.data)
      // }
      @Post()
      //  @HttpCode(201)
       create(@Body() track: TrackDTO): Promise<trackEntity>{
          return this.trackService.createTrack(track)
        }
      @Delete(":id")
      //  @HttpCode(200)
        delete(@Param("id") id:number): Promise<responseDTO>{
          return this.trackService.delete(id)
        }
      
      @Put()
        update(@Param(":id") id:string, @Body() body: TrackDTO): Promise<any>{
          return  this.trackService.update(id,body)
        }

      @Patch()
        updatePatch(@Param(":id") id:string, @Body()body: Partial<TrackDTO>): Promise<responseDTO>{
          return this.trackService.updatePatch(id,body);
        }
      
}




