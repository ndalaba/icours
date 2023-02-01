import {Column, Entity, OneToMany} from "typeorm";
import BaseEntity from "../shared/BaseEntity";


@Entity('classes')
export default class Classe extends BaseEntity {

    @Column({type: "varchar", nullable: false})
    name: string

    @Column({type: "varchar", nullable: false})
    slug: string

    @Column({type: "text", nullable: true})
    description: string

    constructor(classe?: Partial<Classe>) {
        super()
        Object.assign(this, classe)
    }
}