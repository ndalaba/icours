import {Column, Entity,  ManyToOne} from "typeorm";
import Course from "./course.entity";
import BaseEntity from "../../shared/BaseEntity";


@Entity('chapters')
export default class Chapter extends BaseEntity {

    @Column({type: "varchar"})
    title: string

    @Column({type: "varchar"})
    slug: string

    @Column({type: "varchar", nullable: true})
    tag: string

    @Column({type: "text"})
    content: string

    @Column({type: 'tinyint', default: false})
    published: boolean

    @Column({type: "int", default: 0})
    views: number

    @ManyToOne(() => Course, (course) => course.chapters)
    course: Course

    constructor(course: Partial<Course>) {
        super()
        Object.assign(this, course)
    }
}