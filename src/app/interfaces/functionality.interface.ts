import { Priority } from '../enums/priority.enum';
import { WorkStatus } from '../enums/workStatus.enum';
import { TaskInterface } from './task.interface';

export interface FunctionalityInterface {
  ID: string;
  name: string;
  description: string;
  priority: Priority;
  status: WorkStatus;
  addedDate: Date;
  startDate?: Date;
  endDate?: Date;
  timeSpent?: number;
  tasks?: TaskInterface[];
}
