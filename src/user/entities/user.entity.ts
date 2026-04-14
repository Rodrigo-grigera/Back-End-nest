import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id_user : number;
    @Column()
    email : string;
    @Column()
    password : string
    @Column({default : "user"}) //todo los que esta creado o se creen van a ser user si no se expecifica 
    rol : string;
}
