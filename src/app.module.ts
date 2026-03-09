import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TrackService } from './track/track.service';
// import { TrackController } from './track/track.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      
    }) 
    ,TrackModule] /*importamos trackModule q posee trackController y trackService.
  por lo tanto no hay que pasar en el controller y provaiders y podemos eliminar los archivos app.controler y
  app.service que vienen en la raiz del proyecto .   */

  // controllers: [AppController,TrackController], esto que esta comentato tambien se puede eliminar xq el proyecto se maneja en modulos
  // providers: [AppService,TrackService], esto ya existe en track module.
})
export class AppModule {}
