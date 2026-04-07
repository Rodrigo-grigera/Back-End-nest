import { ArrayMinSize, IsArray,  IsOptional, IsString, IsUrl, IsUUID, MaxLength } from "class-validator";

export class ArtistDto {
    @IsString()
    @MaxLength(255)
    nombre: string

    @IsString()
    @IsOptional()
    @MaxLength(100)
    pais: string

    @IsString()
    @IsOptional()
    biografia: string
    
    @IsUrl()
    @IsOptional()
    imageURL: string

    @IsString()
    @IsOptional()
    @MaxLength(50)
    genero: string

    @IsArray()
    @IsUUID('all' , { each: true })
    @ArrayMinSize(1,{message: 'Tiene que haber al menos 1 TRACKS'})
    trackIds: string[]

    @IsArray()
    @IsUUID('all' , { each: true })
    @ArrayMinSize(1,{message: 'Tiene que haber al menos 1 artista'})
    albumnIds : String[]

    
}
