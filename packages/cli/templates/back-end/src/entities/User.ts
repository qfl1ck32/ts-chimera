import { Entity, Column, PrimaryGeneratedColumn } from '@ts-phoenix/node-orm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @Column()
  email!: string;
}
