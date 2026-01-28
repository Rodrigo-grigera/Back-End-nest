import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// nombramos el nombre de la ruta "canciones"
export class AppController {
  constructor(private readonly appService: AppService) {}

}


