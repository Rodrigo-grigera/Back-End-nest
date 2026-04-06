import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { trackEntity } from './track.entity';
import { AlbumnModule } from '../albumn/albumn.module';
import { ArtistModule } from '../artist/artist.module';


@Module({
    imports:[TypeOrmModule.forFeature([trackEntity]),//esta entidad tiene injectado los repositorios de albumn y artis. por eso importamos sus modulos (relaciones)
    AlbumnModule, ArtistModule], 
    controllers : [TrackController],
    providers : [TrackService],
    exports : [TrackService, TypeOrmModule]
})
export class TrackModule {}
