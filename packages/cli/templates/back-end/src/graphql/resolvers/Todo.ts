import { TodoService } from '@src/services/Todo';
import { Arg, Mutation, Query, Resolver } from '@ts-phoenix/node-graphql';
import { Todo } from '@src/graphql/entities/Todo';
import { CreateTodoInput } from '@src/graphql/inputs/CreateTodo';
import { GetTodoInput } from '@src/graphql/inputs/GetTodo';

@Resolver()
export class TodoResolver {
  constructor(private service: TodoService) {}

  @Mutation(() => Todo)
  async create(@Arg('input') input: CreateTodoInput) {
    return this.service.createTodo(input);
  }

  @Query(() => Boolean, { nullable: true })
  async get(@Arg('input') input: GetTodoInput) {
    return this.service.getTodo(input);
  }
}
