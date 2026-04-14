import { Module } from '@nestjs/common';
import { AlbumnService } from './albumn.service';
import { AlbumnController } from './albumn.controller';
import { Albumn } from './entities/albumn.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports:[TypeOrmModule.forFeature([Albumn]),
  ArtistModule],
  controllers: [AlbumnController],
  providers: [AlbumnService],
  exports : [AlbumnService, TypeOrmModule]

})
export class AlbumnModule {}
