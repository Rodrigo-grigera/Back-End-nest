import { ArrayMinSize, IsArray, IsDate, isDate, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateAlbumnDto {
    @IsString()
    titulo: string

    @IsNumber()
    año: number

    @IsNumber()
    year: number

    @IsString()
    descripcion: string

    @IsArray()
    @IsUUID()
    @ArrayMinSize(1,{message: 'Tiene que haber al menos 1 TRACKS'})
    trackIds : string[]

    @IsArray()
    @IsUUID()
    @ArrayMinSize(1,{message: 'Tiene que haber al menos 1 ARTISTA'})
    artistIds : string[]

    @IsDate()
    createDATE: Date

    @IsDate()
    updaDTE: Date

}
