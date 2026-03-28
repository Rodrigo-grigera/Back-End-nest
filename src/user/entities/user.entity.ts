import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id_user : number;
    @Column()
    email : string;
    @Column()
    password : string
}
