import { Injectable } from '@angular/core';
import { TaskInterface } from '../interfaces/task.interface';
import { FunctionalityInterface } from '../interfaces/functionality.interface';
import { Observable, of } from 'rxjs';
import { WorkStatus } from '../enums/workStatus.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';
  private tasks: TaskInterface[] = [];

  constructor() {
    this.getDataFromLocalStorage();
  }

  private getDataFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) this.tasks = JSON.parse(data);
  }

  private saveDataToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  getTasks(): Observable<TaskInterface[]> {
    return of(this.tasks);
  }

  getSingleTask(ID: string): Observable<TaskInterface> {
    const task = this.tasks.find((task) => task.ID === ID);

    if (task) {
      return of(task);
    } else {
      throw new Error('Task not found');
    }
  }

  createTask(task: TaskInterface): Observable<TaskInterface> {
    const taskCopy = { ...task };
    const functionalityCopy = { ...taskCopy.functionality };
    taskCopy.functionality = functionalityCopy;
    this.tasks.push(taskCopy);
    this.saveDataToLocalStorage();
    return of(taskCopy);
  }
  deleteTask(ID: string): Observable<boolean> {
    const index = this.tasks.findIndex((task) => task.ID === ID);

    if (index !== -1) {
      const deletedTask = this.tasks.splice(index, 1)[0];
      const functionality = deletedTask.functionality;

      if (functionality && functionality.tasks) {
        const taskIndex = functionality.tasks.findIndex(
          (task) => task.ID === ID
        );
        if (taskIndex !== -1) {
          functionality.tasks.splice(taskIndex, 1);
        }

        this.updateFunctionalityStatus(functionality);
      }

      this.saveDataToLocalStorage();
      return of(true);
    } else {
      return of(false);
    }
  }

  updateTask(task: TaskInterface): Observable<TaskInterface> {
    const taskToUpdate = this.tasks.find((t) => t.ID === task.ID);

    if (taskToUpdate) {
      taskToUpdate.name = task.name;
      taskToUpdate.description = task.description;
      taskToUpdate.priority = task.priority;
      taskToUpdate.state = task.state;
      taskToUpdate.addedDate = task.addedDate;
      taskToUpdate.startDate = task.startDate;
      taskToUpdate.endDate = task.endDate;
      taskToUpdate.assignedUser = task.assignedUser;
      taskToUpdate.functionalityID = task.functionalityID;
      taskToUpdate.functionality = task.functionality;

      taskToUpdate.functionality = Object.assign({}, task.functionality);


      this.saveDataToLocalStorage();
      return of(taskToUpdate);
    } else {
      throw new Error('Task not found');
    }
  }

  private updateFunctionalityStatus(functionality: FunctionalityInterface) {
    const hasDoingTask = functionality.tasks?.some(
      (task) => task.state === WorkStatus.Doing
    );
    const allTasksDone = functionality.tasks?.every(
      (task) => task.state === WorkStatus.Done
    );

    if (hasDoingTask) {
      functionality.status = WorkStatus.Doing;
    } else if (allTasksDone) {
      functionality.status = WorkStatus.Done;
    }
  }
}
