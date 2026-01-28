import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [ArtistModule],
  controllers: [AppController, TrackController],
  providers: [AppService, TrackService],
})
export class AppModule {}
