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

    async findAll(): Promise<Course[]> {
        return this.getRepository().find({
            order: {
                title: "asc",
                id: "desc"
            },
            relations: {
                subject: true
            }
        })
    }

    async findOrFail(uid: string): Promise<Course> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async remove(course: Course) {
        return this.getRepository().remove(course)
    }
}