import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from '@ts-phoenix/node-orm';
import { Todo } from './Todo';

@Entity()
export class TodoTranslation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  locale!: string;

  @Column()
  title!: string;

  @ManyToOne(() => Todo, (todo) => todo.translations)
  todo!: Todo;
}
