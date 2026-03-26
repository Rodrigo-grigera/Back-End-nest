import { Artist } from "src/artist/entities/artist.entity";
import { trackEntity } from "src/track/track.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('albumns')
export class Albumn {
    @PrimaryGeneratedColumn('uuid')
    albumn_id : string;

    @Column({type: "varchar", length: 250})
    titulo: string

    @Column({type: "int"})
    year: number

    @Column({type: "text", nullable: true})
    descripcion: string

    @OneToMany(() => trackEntity, track => track.albumn)
    tracks : trackEntity []

    @ManyToMany(() => Artist, artist => artist.albumns,{
        eager: true //carga automaticamente el artista o los artistas con el albumn 
    })
// cuando usamos eager hay que crear una tabla puente , por eso joinTable
    @JoinTable({
        name: 'albumn_artist',
        joinColumn: {name: 'albumn_id', referencedColumnName: 'albumn_id'},
        inverseJoinColumn: {name: 'artist_id', referencedColumnName: 'artist_id'}
    })

    artist : Artist[]

    @CreateDateColumn()
    createDATE: Date
    
    @UpdateDateColumn()
    updaDTE: Date
}
