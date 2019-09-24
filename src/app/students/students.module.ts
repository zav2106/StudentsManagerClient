import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentsSearchComponent } from './components/students-search/students-search.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ConfirmationModalComponent} from '../shared/components/confirmation-modal/confirmation-modal.component';
import {RouterModule} from '@angular/router';
import {StudentsRoutingModule} from './students-routing.module';





@NgModule({
  declarations: [StudentAddComponent, StudentEditComponent, StudentsSearchComponent, StudentsListComponent, ConfirmationModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    StudentsRoutingModule,
    FormsModule,
  ]
})
export class StudentsModule { }
