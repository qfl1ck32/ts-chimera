import { CreateTodoInput } from '@src/graphql/inputs/CreateTodo';
import { GetTodoInput } from '@src/graphql/inputs/GetTodo';
import { Todo } from '@src/orm/entities/Todo';
import { TodoTranslation } from '@src/orm/entities/TodoTranslation';
import { Injectable } from '@ts-phoenix/di';
import { InjectDataSource } from '@ts-phoenix/node-orm';
import { DataSource } from '@ts-phoenix/node-orm-i18n';

@Injectable()
export class TodoService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  // TODO: should separate the input too
  async createTodo(input: CreateTodoInput) {
    const todosRepository = this.dataSource.getRepository(Todo);

    const todo = new Todo();

    todo.finished = false;

    const result = await todosRepository.save(todo);

    const todosTranslationsRepository =
      this.dataSource.getRepository(TodoTranslation);

    const translation = new TodoTranslation();

    translation.locale = 'en';
    translation.title = input.title;
    translation.todo = result;

    await todosTranslationsRepository.save(translation);

    return this.getTodo({ id: result.id });
  }

  async getTodo(input: GetTodoInput) {
    const result = await this.dataSource
      .createI18nQueryBuilder({
        entity: Todo,
        translationEntity: TodoTranslation,
        fields: ['title'],
        alias: 'todo',
      })
      .andWhere('todo.id = :id', { id: input.id })
      .addSelect('todo.finished', 'finished')
      .getRawOne();

    console.log(result);

    return result;
  }
}
