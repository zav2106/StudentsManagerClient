import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StudentsService} from '../../services/students.service';
import {Observable} from 'rxjs';
import {PagedResult} from '../../../shared/models/paged-result';
import {StudentModel} from '../../models/student.model';

@Component({
  selector: 'app-students-search',
  templateUrl: './students-search.component.html',
  styleUrls: ['./students-search.component.scss']
})
export class StudentsSearchComponent implements OnInit {

  firstName = '';

  @Output() onRefresh = new EventEmitter();

  constructor(
    private studentService: StudentsService) { }

    ngOnInit() {
    const that = this;
    setTimeout( () => this.onRefresh.emit(), 0)
    document.body.onkeydown = function (event) {
      const evt = (event || window.event) as any;
      if (evt.keyCode === 13) {
        that.search();
      }
    };
  }

  public getStudents(page, pageSize): Observable<PagedResult<StudentModel>> {
    console.log('aaa')
    return this.studentService.getStudents(page, pageSize);
  }

  search(): boolean {
    this.onRefresh.emit();
    return false;
  }

  clear() {
    this.firstName = '';
    this.onRefresh.emit();
  }
}
