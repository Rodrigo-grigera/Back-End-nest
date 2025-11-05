import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Cancion } from './app.service';
import { get } from 'http';

@Controller("canciones")
// nombramos el nombre de la ruta "canciones"
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): Cancion[] {
    return this.appService.getCanciones();
  }
  @Get(":id")
  getId(@Param('id') id: string): Cancion | undefined {
    return this.appService.getId(Number(id));
  }
}


