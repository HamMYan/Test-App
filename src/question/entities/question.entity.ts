import { Answer } from "src/answer/entities/answer.entity";
import { Test } from "src/test/entities/test.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    question: string
    @Column()
    testId: number
    @OneToMany((type) => Answer, (answer) => answer.question)
    answers: Answer[] 
    @ManyToOne((type) => Test, (test) => test.question)
    test: Test
}