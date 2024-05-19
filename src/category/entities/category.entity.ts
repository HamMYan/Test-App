import { Test } from "src/test/entities/test.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string
    @OneToMany(type => Test, test => test.category)
    tests: Test;
}
