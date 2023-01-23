import BaseEntity from "../shared/BaseEntity";
import {BaseEntity as TOEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer"

export class Role {
    public static ROLE_STUDENT = 10
    public static ROLE_PARENT = 20
    public static ROLE_PROFESSOR = 30
    public static ROLE_ADMIN = 50
    public static ROLE_SUPER_ADMIN = 100

    static roles(): Array<number> {
        return [Role.ROLE_ADMIN, Role.ROLE_SUPER_ADMIN, Role.ROLE_PARENT, Role.ROLE_PROFESSOR, Role.ROLE_STUDENT]
    }

    static isValid(role: number): boolean {
        return Role.roles().includes(role)
    }
}

export class Gender {
    public static MALE = 1
    public static FEMALE = 0

    static genders(): Array<number> {
        return [Gender.MALE, Gender.FEMALE]
    }

    static isValid(gender: number): boolean {
        return Gender.genders().includes(gender)
    }
}

@Entity("tokens")
export class Token extends TOEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar"})
    token: string

    @Column({name:"expire_date",type:"datetime"})
    expireDate: Date

    @OneToOne(() => User, (user) => user.token)
    @JoinColumn({name: "user_id"})
    user: Partial<User>

    constructor(obj:Partial<Token>) {
        super()
        Object.assign(this, obj)
    }

}


@Entity("users")
export default class User extends BaseEntity {

    @Column({nullable: false,  length: 150, name: "first_name",type:"varchar"})
    firstName: string

    @Column({nullable: false,  length: 150, name: "last_name",type:"varchar"})
    lastName: string

    @Column({nullable: false,  length: 100, unique: true,type:"varchar"})
    @Index()
    email: string

    @Index()
    @Column({nullable: false,  length: 50, unique: true,type:"varchar"})
    phone: string

    @Column({nullable: false,type:"smallint"})
    role: number = Role.ROLE_STUDENT

    @Column({nullable:true,type:"tinyint"})
    gender: number

    @Column({name: "birth_day",nullable:true})
    birthDay: Date

    @Column({type: "text",nullable:true})
    address: string

    @Column({type:"tinyint"})
    active: boolean = false

    @Column({name: "last_login",nullable:true,type:"datetime"})
    lastLogin: Date

    @Exclude()
    @OneToOne(() => Token, (token) => token.user)
    token: Token

    @Exclude()
    @Column({nullable: false,  length: 100,type:"varchar"})
    password: string

    @Column({nullable:true,length:150,type:"varchar"})
    photo: string

    constructor(user?: Partial<User>) {
        super();
        Object.assign(this, user)
    }

    hasAnyRole(roles: Array<number>): boolean {
        return roles.includes(this.role)
    }

    hasRole(role: number): boolean {
        return this.role === role
    }

    isAdmin(): boolean {
        return this.hasRole(Role.ROLE_ADMIN) || this.hasRole(Role.ROLE_SUPER_ADMIN)
    }

    canManage(user: User): boolean {
        return this.is(user) || user.hasAnyRole([Role.ROLE_ADMIN, Role.ROLE_SUPER_ADMIN])
    }
}