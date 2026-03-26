import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { trackEntity } from './track/track.entity';
import { ArtistModule } from './artist/artist.module';
// import { TrackService } from './track/track.service';
// import { TrackController } from './track/track.controller';
import { AlbumnModule } from './albumn/albumn.module';
import { Albumn } from './albumn/entities/albumn.entity';
import { Artist } from './artist/entities/artist.entity';



@Module({
  imports: [
    ConfigModule.forRoot(), //Instalamos @nestjs/config para poder leer las variables de entorno (.env)
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      synchronize: true,
      // entities:[__dirname + '/**/*.entity{.ts,.js}'] //de esta forma decimos que lea todos los archivos .entiti (en caso de crear mas entidades para la tabla)
      entities:[trackEntity,Albumn,Artist]
    }) 
    ,TrackModule, ArtistModule, AlbumnModule] /*importamos trackModule q posee trackController y trackService.
  por lo tanto no hay que pasar en el controller y provaiders y podemos eliminar los archivos app.controler y
  app.service que vienen en la raiz del proyecto .   */

  // controllers: [AppController,TrackController], esto que esta comentato tambien se puede eliminar xq el proyecto se maneja en modulos
  // providers: [AppService,TrackService], esto ya existe en track module.
})
export class AppModule {}
