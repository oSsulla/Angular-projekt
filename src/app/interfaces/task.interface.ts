import { Priority } from '../enums/priority.enum';
import { WorkStatus } from '../enums/workStatus.enum';
import { FunctionalityInterface } from './functionality.interface';
import { UserInterface } from './user.interface';

export interface TaskInterface {
  ID: string;
  name: string;
  description: string;
  priority: Priority;
  functionality: FunctionalityInterface;
  functionalityID: string;
  state: WorkStatus;
  addedDate: Date;
  startDate?: Date;
  endDate?: Date;
  assignedUser?: UserInterface;
}
