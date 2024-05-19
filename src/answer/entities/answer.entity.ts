import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  answer: string;
  @Column()
  questionId: number;
  @Column({ default: 0 })
  status: number;
  @ManyToOne(type => Question, question => question.answers)
  question: Question;
}
