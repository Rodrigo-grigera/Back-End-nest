import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { trackEntity } from './track.entity';


@Module({
    imports:[TypeOrmModule.forFeature([trackEntity])],
    controllers : [TrackController],
    providers :[TrackService]
})
export class TrackModule {}
