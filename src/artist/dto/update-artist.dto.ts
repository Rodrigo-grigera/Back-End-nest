import { PartialType } from '@nestjs/mapped-types';
import { ArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(ArtistDto) {}
