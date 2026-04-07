import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { LoginUserDto} from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { responseDTO } from '../dto/responseDTO';
import { UserEntity } from './entities/user.entity';

// intalamos bcrypt npm i @bcrypt
// intalamos los tipos  npm i -D  @types/bcrypt

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

  // private readonly  users = [{id: 1, email: 'nahuel@gmail.com', password:"$2a$04$dzn3g43zZyBazbOzWv0AsuXfAuFOt00/Ygbe2tKqDCc3BgCpDWfp2"}];
// esta password es pas1234 encriptada nos da ese codigo. (de manera hardcodeado, no estamos usando base de datos)

  async login(loginUser: LoginUserDto): Promise <any> {
    const emailUsuario = loginUser.email;
    const passwUsuario = loginUser.password;

    const usuario = await this.userRepository.findOneBy({email: emailUsuario});
    if(usuario == null || usuario == undefined){
      return{ message: 'Password invalido '}
    }
    if(bcrypt.compareSync(passwUsuario, usuario.password )){
      // bcrypt.compareSync compara la contraseña que envia el usuario con una encryptacion
      return {
        message: 'Login aceptado'
      };
    }
    throw new NotFoundException('Usuario invalido');
  }

  async create(createUser : CreateUserDto) : Promise <responseDTO>{

    const passwordHash = bcrypt.hashSync(createUser.password, 2)// el 2 hace referencia a la cantidad de veces queremos hashear la contraseña
    createUser.password = passwordHash; //al createUser le decimos que passwor que tiene que guardar es la pas hasheada

    const newUser = this.userRepository.create(createUser);
    const resp = await this.userRepository.save(newUser);
    if(!resp) throw new NotFoundException('Error al crear el usuario');
    return {
          message :'Usuario creado',
          code : HttpStatus.CREATED
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
