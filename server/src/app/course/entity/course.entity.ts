import {Column, Entity, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import BaseEntity from "../../shared/BaseEntity";
import Subject from "../../subject/subject.entity";
import Classe from "../../classes/classe.entity";
import Chapter from "./chapter.entity";
import User from "../../user/user.entity";

@Entity('courses')
export default class Course extends BaseEntity {

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

    @ManyToOne(() => Subject, (subject) => subject.courses)
    subject: Subject

    @ManyToOne(() => User, (user) => user.courses)
    user: User

    @OneToMany(() => Chapter, (chapter) => chapter.course)
    chapters: Chapter[]

    @ManyToMany(() => Classe, (classe) => classe.courses)
    classes: Classe[]

    constructor(course: Partial<Course>) {
        super()
        Object.assign(this, course)
    }

    canEdit(user: User) {
        return user.isAdmin() || user.is(this.user);

    }
}