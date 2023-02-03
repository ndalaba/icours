import DataSource from "../../../ormconfig"
import Chapter from "../entity/chapter.entity";

export default class ChapterRepository {

    getRepository() {
        return DataSource.getRepository(Chapter);
    }

    async save(chapter: Chapter): Promise<Chapter> {
        return await chapter.save()
    }

    async findOneBy(key: string, value: any): Promise<Chapter> {
        if (value == undefined) return null
        return await this.getRepository().findOne({where: {[key]: value}})
    }

    async findOneBySlug(slug: string): Promise<Chapter> {
        return this.findOneBy('slug', slug)
    }

    async findAll(course: number, published: number = null): Promise<Chapter[]> {
        const query = this.getRepository().createQueryBuilder("chapter")
            .leftJoinAndSelect("chapter.course", "course")
        query.andWhere("chapter.course = :courseId", {"courseId": course})
        if (published !== 2)
            query.andWhere("chapter.published = :published", {"published": published})
        return query.take(50).getMany()
    }

    async findOrFail(uid: string): Promise<Chapter> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async remove(chapter: Chapter) {
        return this.getRepository().remove(chapter)
    }
}