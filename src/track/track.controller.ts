import { Controller, Get, Post, Param, Body, Delete, Put, Patch, HttpCode, HttpStatus, Res, ParseIntPipe, ParseUUIDPipe  } from '@nestjs/common';
import { TrackService } from './track.service';
import { responseDTO } from 'src/dto/responseDTO';
import {type Response } from 'express';
import { TrackDTO } from 'src/dto/trackDTO';

@Controller("tracks")
export class TrackController {
    constructor(private readonly trackService: TrackService){}

      @Get()
      //  @HttpCode(200) //asi mostramos en postman el codigo de respuesta
        getTracksAll(): Promise <TrackDTO|responseDTO> {
        return  this.trackService.getTracks();
      }
      @Get(":id")
      // @HttpCode(204)
      //una mejor practica es con enum.@HttpCode(HttpStatus.NO_CONTENT)
      async getById(@Res() res:Response ,@Param('id') id: string): Promise <any> {
          const response : responseDTO = await this.trackService.getTrackId(id) ;
          res.status(response.code).json(response.data)
      }
      @Post()
      //  @HttpCode(201)
        create(@Body() track: TrackDTO): Promise<void>{
          return this.trackService.createTrack(track)
        }
      @Delete(":id")
       @HttpCode(200)
        delete(@Param("id") id:string): Promise<void>{
          return this.trackService.delete(id)
        }
      
      @Put()
        update(@Param(":id") id:string, @Body() body: TrackDTO): Promise<any>{
          return  this.trackService.update(id,body)
        }

      @Patch()
        updatePatch(@Param(":id") id:string, @Body()body: TrackDTO): Promise<any>{
          return this.trackService.updatePatch(id,body);
        }
      
}




