import { Field, ObjectType } from '@ts-phoenix/node-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from '@ts-phoenix/node-orm';
import { Post } from './Post';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column()
  age!: number;

  @Field()
  @Column()
  email!: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
