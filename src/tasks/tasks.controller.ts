import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { stat } from 'fs';

@Controller('tasks')
export class TasksController
{
    constructor(private tasksService: TasksService)
    {

    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDTO): Task[]
    {
        if (Object.keys(filterDto).length)
        {
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        else
        {

            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string)
    {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task
    {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void
    {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    )
    {
        return this.tasksService.updateTaskStatus(id, status);
    }

}
