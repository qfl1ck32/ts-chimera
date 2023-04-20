import { Field, ObjectType } from '@ts-phoenix/node-graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from '@ts-phoenix/node-orm';
import { User } from './User';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  content!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user!: User;
}
