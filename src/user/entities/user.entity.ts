import { Role } from './role.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserTest } from 'src/user-test/entities/user-test.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: number;

    @Column()
    role: number;

    @Column({default: 0})
    isVerify: number;

    @Column({nullable:true})
    emailToken: string;

    @OneToMany((type) => UserTest, userTest => userTest.user)
    userTest: UserTest[]
}