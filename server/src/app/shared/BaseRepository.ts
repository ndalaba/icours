import { BaseEntity } from "typeorm"
import DataSource from "../../ormconfig"

export abstract class BaseRepository {

    constructor(private entity: BaseEntity) {

    }

    async findBy(field: string, value: any): Promise<entity[]> {
        return await DataSource.getRepository(Token).find({
            where: {
                [field]: value
            },
            relations: {
                user: true
            }
        })
    }

    async findOneBy(field: string, value: any): Promise<Token> {
        return await DataSource.getRepository(Token).findOne({
            where: {
                [field]: value
            },
            relations: {
                user: true
            }
        })
    }
}