import { HttpException, HttpStatus } from "@nestjs/common";


export class myExeption extends HttpException{
    constructor(message: string, status: HttpStatus){
        super(message,status)
    }
}

/* creamos nuestra propia exepcion, es una clase que extiende de httexeption
en el constructor le pasamos el msj y el status, y en el super tambien.  */