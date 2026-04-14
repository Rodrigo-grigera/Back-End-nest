import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { respLogDTO } from './dto/responseDtoLog';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService : UserService, private jwtService : JwtService  ){}
  //inyectamos el servicio del user para poder usar los metodos creados ahi.
  //inyectamos jwt para devolver el token y no el usuario
 async login(loginUser: LoginUserDto): Promise <respLogDTO> {
      
      const emailUsuario = loginUser.email;
      const passwUsuario = loginUser.password;

    const usuario = await this.userService.findUserEmail(emailUsuario)
//en el archivo user tenemos un metedo que busca los email (findUserEmail)
    if(!usuario){
      throw new UnauthorizedException('Usuario invalido')
    }
    const pasworValido = bcrypt.compareSync(passwUsuario, usuario.password );
    // bcrypt.compareSync compara la contraseña que envia el usuario con una encryptacion  
  
    if(!pasworValido) throw new UnauthorizedException('Passwor invalido')
      
      const payload = {
      email: usuario.email,
      rol: usuario.rol,
      id : usuario.id_user
      };

      const token = await this.jwtService.signAsync(payload)

      return {
        message: 'Login aceptado',
        access_token : token,
      };
  
}

}
