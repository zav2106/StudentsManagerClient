import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import {StudentsListComponent} from './components/students-list/students-list.component';
import {StudentEditResolver} from './resolvers/student-edit.resolver';

const studentRoutes: Routes = [
  {
    path: 'students',
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'prefix' },
      {
        path: 'list',
        component: StudentsListComponent,
        // canActivate: [studentExistingGuard],
      }
    ],
  },
  {
    path: 'edit-student/:id',
    component: StudentEditComponent,
    resolve: { student: StudentEditResolver },
  },
  {
    path: 'add-student',
    component: StudentAddComponent,
  },
  { path: '', redirectTo: '/students/list', pathMatch: 'full'},
  // { path: '**', redirectTo: '/students/list', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(studentRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    StudentEditResolver,
  ],
})
export class StudentsRoutingModule {}
