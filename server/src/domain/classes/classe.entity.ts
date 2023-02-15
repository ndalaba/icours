import {Column, Entity, ManyToMany,JoinTable} from "typeorm";
import BaseEntity from "../shared/BaseEntity";
import Course from "../course/entity/course.entity";


@Entity('classes')
export default class Classe extends BaseEntity {

    @Column({type: "varchar", nullable: false})
    name: string

    @Column({type: "varchar", nullable: false})
    slug: string

    @Column({type: "text", nullable: true})
    description: string

    @ManyToMany(() => Course, (course) => course.classes)
    @JoinTable({name:'classe_course'})
    courses: Course[]

    constructor(classe?: Partial<Classe>) {
        super()
        Object.assign(this, classe)
    }
}