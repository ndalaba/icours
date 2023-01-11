import {BaseEntity as Entity, Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {generateUid} from "../../helpers/string";
import {Exclude, instanceToPlain} from "class-transformer";

export default abstract class BaseEntity extends Entity {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 100})
    @Index()
    uid: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    protected constructor() {
        super()
        this.uid = generateUid()
    }

    is(obj: BaseEntity): boolean {
        return obj.uid === this.uid
    }

    hydrate(object: BaseEntity): BaseEntity {
        Object.assign(this, object)
        return this
    }

    toString(): string {
        return `${this.constructor.name} (uid:${this.uid})`
    }

    toJSON() {
        return instanceToPlain(this)
    }
}