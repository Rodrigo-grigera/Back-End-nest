import { IsString, IsNumber, MaxLength, ArrayMinSize, IsArray, IsUUID, IsOptional, Min } from "class-validator";

export class TrackDTO{
    @IsString()
    @MaxLength(255)
    nombre: string
 
    @IsNumber()
    @Min(1)
    duracion: number
    
    @IsNumber()    
    trackNUM?: number

    @IsString()
    @MaxLength(50)
    genero: string
    
    @IsNumber()
    year: number 
    
    @IsArray()
    @IsUUID('all' , { each: true })
    @ArrayMinSize(1,{message: 'Tiene que haber al menos 1 TRACKS'})
    artistaIds: string []

    @IsArray()
    @IsOptional()
    albumnIds? : string[]


}

/* instalamos class validator y class transformer para poder agregar los decoradores
y de esta manera se respeta la estructura de la clase dto . el usuario al crear un track no va a poder agregar propiedades de mas
ni faltar propiedades  */