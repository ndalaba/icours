import Subject from "./subject.entity";
import DataSource from "../../ormconfig"
import Course from "../course/entity/course.entity";


export default class SubjectRepository {

    getRepository() {
        return DataSource.getRepository(Subject);
    }

    async save(subject: Subject): Promise<Subject> {
        return await subject.save()
    }

    async findOneBy(key: string, value: any): Promise<Subject> {
        if (value == undefined) return null
        return await this.getRepository().findOne({where: {[key]: value}})
    }

    async findOneByName(name: string): Promise<Subject> {
        return this.findOneBy("name", name)
    }

    async findOneBySlug(slug: string): Promise<Subject> {
        return this.findOneBy('slug', slug)
    }

    async findAll(): Promise<Subject[]> {
        return this.getRepository().find({
            order: {
                name: "asc",
                id: "desc"
            }
        })
    }

    async findOrFail(uid: string): Promise<Subject> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async countCourses(subject: number) {
        return DataSource.getRepository(Course)
            .createQueryBuilder("course")
            .select("COUNT(course.id)")
            .where("course.subject = :subject", {'subject': subject})
            .getCount()
    }

    async remove(subject: Subject) {
        return this.getRepository().remove(subject)
    }
}