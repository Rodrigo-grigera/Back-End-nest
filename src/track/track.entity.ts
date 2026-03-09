import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class trackEntity{
    @PrimaryGeneratedColumn()    
    private id: number
    @Column()
    private nombre: string
    @Column()    
    private artista: string
    @Column()    
    private duracion: string
    @Column()    
    private album: string
    @Column()    
    private genero: string
    @Column()    
    private año: 1982

    constructor(nombre: string, artista: string, duracion: string, album: string, genero: string, año: 1982){
        this.nombre = nombre
        this.artista = artista
        this.duracion = duracion
        this.album = album
        this.genero = genero
        this.año = año
    }
}
//creamos la entidad que es como la clase dto pero con diferentes decoradores.
/*El typeorm nos permite crear entidades que representan las tablas de nuestra base de datos, */