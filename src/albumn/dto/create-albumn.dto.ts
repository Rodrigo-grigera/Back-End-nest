import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAlbumnDto {
    @IsString()
    titulo: string

    @IsNumber()
    year: number

    @IsString()
    descripcion: string

    @IsArray()
    @IsUUID()
    @IsOptional()
    // @ArrayMinSize(1,{message: 'Tiene que haber al menos 1 TRACKS'})
    trackIds? : string[]

    @IsArray()
    @IsUUID('4', {each : true})
    // @IsOptional()
    @ArrayMinSize(1,{message: 'Tiene que haber al menos 1 ARTISTA'})
    artistIds : string[]

}
