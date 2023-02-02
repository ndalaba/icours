import {Course} from "./course.entity";
import DataSource from "../../ormconfig"


export default class CourseRepository {

    getRepository() {
        return DataSource.getRepository(Course);
    }

    async save(course: Course): Promise<Course> {
        return await course.save()
    }

    async findOneBy(key: string, value: any): Promise<Course> {
        if (value == undefined) return null
        return await this.getRepository().findOne({where: {[key]: value}})
    }

    async findOneBySlug(slug: string): Promise<Course> {
        return this.findOneBy('slug', slug)
    }

    async findAll(subject: number = null, classe: number = null, published: number = null): Promise<Course[]> {
        const query = this.getRepository().createQueryBuilder("course")
            .leftJoinAndSelect("course.subject", "subject")
            .leftJoinAndSelect("course.classes", "classes")
        if (subject !== 0)
            query.andWhere("course.subject = :subjectId", {"subjectId": subject})
        if (published !== 2)
            query.andWhere("course.published = :published", {"published": published})
        if (classe !== 0)
            query.andWhere('classes.id = :classeId', {"classeId": classe})
        return query.take(50).getMany()
    }

    async findOrFail(uid: string): Promise<Course> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async remove(course: Course) {
        return this.getRepository().remove(course)
    }
}