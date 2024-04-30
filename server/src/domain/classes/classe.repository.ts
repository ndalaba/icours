import Classe from "./classe.entity";
import DataSource from "../../ormconfig"
import Course from "../course/entity/course.entity";


export default class ClasseRepository {

    getRepository() {
        return DataSource.getRepository(Classe);
    }

    async save(classe: Classe): Promise<Classe> {
        return await classe.save()
    }

    async findOneBy(key: string, value: any): Promise<Classe> {
        if (value == undefined) return null
        return await this.getRepository().findOne({where: {[key]: value}})
    }

    async findOneByName(name: string): Promise<Classe> {
        return this.findOneBy("name", name)
    }

    async findOneBySlug(slug: string): Promise<Classe> {
        return this.findOneBy('slug', slug)
    }

    async findAll(): Promise<Classe[]> {
        return this.getRepository().find({
            order: {
                name: "asc",
                id: "desc"
            }
        })
    }

    async findOrFail(uid: string): Promise<Classe> { 
        return this.getRepository().findOneByOrFail({uid})
    }

    async remove(classe: Classe) {
        return this.getRepository().remove(classe)
    }
}