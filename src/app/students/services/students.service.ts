import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PagedResult } from '../../shared/models/paged-result';
import { StudentModel } from '../models/student.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.api}/api/students`;

  public getStudents(page = 1, pageSize = 25) {
    return this.http.get<PagedResult<StudentModel>>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  public deleteStudent(studentId: number) {
    return this.http.delete(`${this.apiUrl}/${studentId}`);
  }

  public getCarrierById(carrierId): Observable<StudentModel> {
    return this.http.get<StudentModel>(`${this.apiUrl}/${carrierId}`);
  }
}

