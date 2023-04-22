import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from '@ts-phoenix/node-orm';
import { TodoTranslation } from './TodoTranslation';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  finished!: boolean;

  @OneToMany(
    () => TodoTranslation,
    (todoTranslations) => todoTranslations.todo,
    {
      cascade: true,
    },
  )
  translations!: TodoTranslation[];
}
