import { Albumn } from "src/albumn/entities/albumn.entity"
import { Artist } from "src/artist/entities/artist.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('tracks')
export class trackEntity{
    @PrimaryGeneratedColumn("uuid")    
    track_id: string

    @Column({type: "varchar", length: 255})
    nombre: string

    @Column({type: "int", nullable: true})    
    trackNUM: number //va a tener un numero de track por el album

    @Column({type: "int"})    
    duracion: number

    @Column({type: "varchar", length: 50})    
    genero: string

    @Column({type: "int"})    
    year: number

    @ManyToOne(() => Albumn, albumn => albumn.tracks, {
        nullable : true, //permite tracks sin albumns
        onDelete : "SET NULL" //en esta ocacion nos permite que se elimine el albumn pero sin los tracks, q los tracks queden en la base de datos
    })
    @JoinColumn({name: "albumn_id"})
    albumn : Albumn

    @ManyToMany(() => Artist, artist => artist.tracks, {
        eager : true , //typeOrm tiene esta propiedad q nos permite cargar las relaciones sin q hagamos el join (ojo hace q la consulta sea mas pesada)
        onDelete: "RESTRICT" //evita eliminar los tracks si tiene artistas vinculados
})

// creamos una tabla puente (la nombramos con el nombre de la entidad que estamos trabajando con la que la queremos relacionar)
// name : track (la entidad que estamos)_artist(la entidad que queremos relacionar)
    @JoinTable({
        name: 'track_artist',
        joinColumn: {name: 'track_id', referencedColumnName: 'track_id'},
        inverseJoinColumn:{name: 'artist_id', referencedColumnName: 'artist_id'}
    })
  artist : Artist[]

    @CreateDateColumn()
    createDATE: Date //a esta columna le va a poner la fecha y hora en la que se crea

        @UpdateDateColumn() //hace lo mismo q create pero cuando el campo se actualiza tambien se actializa la hora
        updaDTE: Date
}
//creamos la entidad que es como la clase dto pero con diferentes decoradores.
/*El typeorm nos permite crear entidades que representan las tablas de nuestra base de datos, */