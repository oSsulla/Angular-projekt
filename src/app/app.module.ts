import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FunctionalityEditComponent } from './components/functionality-edit/functionality-edit.component';
import { FunctionalityFormComponent } from './components/functionality-form/functionality-form.component';
import { FunctionalityListComponent } from './components/functionality-list/functionality-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    FunctionalityEditComponent,
    FunctionalityFormComponent,
    FunctionalityListComponent,
    TaskFormComponent,
    TaskListComponent,
    UserProjectsComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
