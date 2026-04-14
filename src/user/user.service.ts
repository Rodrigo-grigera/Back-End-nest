import { HttpStatus, Injectable, NotFoundException} from '@nestjs/common';

import * as bcrypt from 'bcrypt'; 
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { resposeUserDTO } from './dto/responseDto';


// intalamos bcrypt npm i @bcrypt
// intalamos los tipos  npm i -D  @types/bcrypt

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

  // private readonly  users = [{id: 1, email: 'nahuel@gmail.com', password:"$2a$04$dzn3g43zZyBazbOzWv0AsuXfAuFOt00/Ygbe2tKqDCc3BgCpDWfp2"}];
// esta password es pas1234 encriptada nos da ese codigo. (de manera hardcodeado, no estamos usando base de datos)

 
  

  async create(createUser : CreateUserDto) : Promise <resposeUserDTO>{

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


  async findUserEmail(email : string) : Promise <UserEntity | null> {
    return await this.userRepository.findOneBy({email : email})
  }

  // async update(id: number, body: UpdateUserDto): <responseDTO> {
  //   const updateUser = await this.userRepository.update(id,body);
  //   retutn{
      
  //   }
   
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
