import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { NotFoundInterceptor } from 'src/interceptors/notFound.interceptor';

@Controller('api/todos')
@UseInterceptors(new NotFoundInterceptor('No todo found for given id', 'id'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get()
  getAll(): Promise<Todo[]> {
    return this.todosService.findAllTodos();
  }

  @Get(':id')
  getOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    todoId: number,
  ): Promise<Todo> {
    return this.todosService.findOneTodo(todoId);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto);
  }

  @Put(':id')
  replace(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    todoId: number,
    @Body()
    createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todosService.replaceTodo(todoId, createTodoDto);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    todoId: number,
    @Body()
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.updateTodo(todoId, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    todoId: number,
  ): Promise<boolean> {
    return this.todosService.deleteTodo(todoId);
  }
}
