import { TaskRepository } from './task.repository';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService
{

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    )
    {

    }

    // getAllTasks(): Task[]
    // {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[]
    // {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status)
    //     {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search)
    //     {
    //         tasks = tasks.filter(tasks =>
    //             tasks.title.includes(search) || tasks.description.includes(search));
    //     }
    //     return tasks;
    // }


    async getTaskById(id: number): Promise<Task>
    {
        const found = await this.taskRepository.findOne(id);

        if (!found)
        {                               // back tick are important here
            throw new NotFoundException(`Task with ID"${id}" not found`);
        }
        return found;
    }


    // createTask(createTaskDto: CreateTaskDto): Task
    // {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuidv1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id: string): void
    // {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus)
    // {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
