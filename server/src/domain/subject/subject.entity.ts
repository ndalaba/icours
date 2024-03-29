import {Column, Entity, OneToMany} from "typeorm";
import Course from "../course/entity/course.entity";
import BaseEntity from "../shared/BaseEntity";


@Entity('subjects')
export default class Subject extends BaseEntity {

    @Column({type: "varchar", nullable: false})
    name: string

    @Column({type: "varchar", nullable: false})
    slug: string

    @Column({type: "varchar", nullable: true})
    image: string

    @Column({type: "text", nullable: true})
    description: string

    @OneToMany(() => Course, (course) => course.subject)
    courses: Course[]

    constructor(subject?: Partial<Subject>) {
        super()
        Object.assign(this, subject)
    }
}