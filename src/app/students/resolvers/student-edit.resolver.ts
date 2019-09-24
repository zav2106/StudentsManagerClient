import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {StudentsService} from '../services/students.service';
import {Observable} from 'rxjs';
import {StudentModel} from '../models/student.model';



@Injectable()
export class StudentEditResolver implements Resolve<any> {
  constructor(private studentService: StudentsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StudentModel> {
    const id = route.params.id || route.params.carrierId;
    return this.studentService.getCarrierById(id);
  }
}
