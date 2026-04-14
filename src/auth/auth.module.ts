import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[UserModule,
    JwtModule.registerAsync({
    inject: [ConfigService], // inyectamos esto para poder leer las variables en el archivo .env
    useFactory: (configService: ConfigService) => ({ 
    secret: configService.get<string>('JWT_SECRET'),
    //jwt_secret la firma de token que (clave) que creamos en archivo .env
     //usa el metodo get de configuService para traer la variable de entorno que creamos en el archivo env
    signOptions: { expiresIn: '1h' }, //duracion de lo que dura el token
  }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
