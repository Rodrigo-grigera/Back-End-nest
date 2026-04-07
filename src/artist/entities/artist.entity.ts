import { Albumn } from "../../albumn/entities/albumn.entity";
import { trackEntity } from "../../track/track.entity";
import { Column,  CreateDateColumn,  Entity,  ManyToMany,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('artist')
export class Artist {

    @PrimaryGeneratedColumn("uuid")
    artist_id : string

    @Column({type: "varchar", length: 255, unique: true}) //estos campos son para la base de datos
    nombre : string

    @Column({type: "varchar", length: 100})
    pais: string

    @Column({type: "text", nullable: true}) // nulable es decir que un campo puede ser nulo
    biografia: string

    @Column({type: "text", nullable: true})
    imageURL: string

    @Column({type: "varchar", length: 50, nullable: true})
    genero: string

   @ManyToMany(() => trackEntity, track => track.artists,{
        onDelete : "RESTRICT" //evita eliminar artistas con tracks
   })
    tracks: trackEntity[]

    @ManyToMany(() => Albumn, albumns => albumns.artist, {
        onDelete: "RESTRICT"
    })
    album : Albumn[]

    @CreateDateColumn()
    createDATE: Date
    @UpdateDateColumn()
    updaDTE: Date
}
