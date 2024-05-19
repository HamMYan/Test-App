import { Test } from "src/test/entities/test.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserTest {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    rating: number
    @ManyToOne((type) => User, user => user.userTest)
    user: User
    @ManyToOne((type) => Test, test => test.userTest)
    test: Test
}