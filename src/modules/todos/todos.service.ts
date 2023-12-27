import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOneTodo(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id });
  }

  createTodo(todo: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(id: number, todo: UpdateTodoDto): Promise<Todo> {
    if (Object.keys(todo).length !== 0)
      await this.todoRepository.update(id, todo);
    return this.todoRepository.findOneBy({ id });
  }

  async replaceTodo(id: number, todo: CreateTodoDto): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return this.todoRepository.findOneBy({ id });
  }

  async deleteTodo(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete({ id });
    if (result.affected === 0) return false;
    return true;
  }
}
