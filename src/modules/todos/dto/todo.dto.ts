import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;
  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
