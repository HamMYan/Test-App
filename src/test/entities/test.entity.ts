import { Category } from "src/category/entities/category.entity";
import { Question } from "src/question/entities/question.entity";
import { UserTest } from "src/user-test/entities/user-test.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string
    @Column()
    categoryId: number
    @Column()
    archive: number;
    @ManyToOne(type => Category, category => category.tests)
    category: Category
    @OneToMany(type => Question, question => question.test)
    question: Question[]
    @OneToMany(type => UserTest, userTest => userTest.test)
    userTest: UserTest[]
}