import User, {Token} from "./user.entity";
import DataSource from "../../ormconfig"


export class UserRepository {

    getRepository() {
        return DataSource.getRepository(User);
    }

    async save(user: User): Promise<User> {
        return await user.save()
    }

    async findOneBy(key: string, value: any): Promise<User> {
        if (value == undefined || value == null)
            return null
        return await this.getRepository().findOne({where: {[key]: value}})
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.findOneBy("email", email)
    }

    async findOneByPhone(phone: string): Promise<User> {
        return this.findOneBy('phone', phone)
    }

    async findOneByOrFail(uid: string): Promise<User> {
        return this.getRepository().findOneByOrFail({uid})
    }

    async findAll() {
        return this.getRepository().find()
    }
}


export class TokenRepository {

    getRepository() {
        return DataSource.getRepository(Token);
    }

    async save(token: Token): Promise<Token> {
        return await token.save()
    }

    async findOneByToken(token: string): Promise<Token> {
        if (token == undefined || token == null)
            return null
        return await this.getRepository().findOne({
            where: {token},
            relations: {user: true}
        })
    }

    async findOneByUser(user: User): Promise<Token> {
        return await this.getRepository().findOne({
            where: {user: user.id},
            relations: {user: true}
        })
    }
}

