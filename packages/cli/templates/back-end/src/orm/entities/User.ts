import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from '@ts-phoenix/node-orm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  hash!: string;
}
