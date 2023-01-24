import { Token } from "./user.entity";
import DataSource from "../../ormconfig"

export class TokenRepository {

    async findBy(field: string, value: any): Promise<Token[]> {
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