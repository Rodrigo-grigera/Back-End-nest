import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { responseDTO } from 'src/dto/responseDTO';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: ArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll(): Promise <responseDTO> {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
