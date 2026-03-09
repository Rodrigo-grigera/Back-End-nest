import { IsString, IsNumber } from "class-validator";

export class TrackDTO{
    @IsString()
    nombre: string
    @IsString()
    artista: string
    @IsString()
    duracion: string
    @IsString()
    album: string
    @IsString()
    genero: string
    @IsNumber()
    año: 1982   
}

/* instalamos class validator y class transformer para poder agregar los decoradores
y de esta manera se respeta la estructura de la clase dto . el usuario al crear un track no va a poder agregar propiedades de mas
ni faltar propiedades  */