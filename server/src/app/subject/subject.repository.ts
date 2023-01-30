import Subject from "./subject.entity";
import DataSource from "../../ormconfig"


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

    async findOneBySubject(subject: string): Promise<Subject> {
        return this.findOneBy("subject", subject)
    }

    async findOneBySlug(slug: string): Promise<Subject> {
        return this.findOneBy('slug', slug)
    }

    async findAll(): Promise<Subject[]> {
        return this.getRepository().find({
            order: {
                subject: "asc",
                id: "desc"
            }
        })
    }

    async findOrFail(uid: string): Promise<Subject> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async remove(subject: Subject) {
        return this.getRepository().remove(subject)
    }
}