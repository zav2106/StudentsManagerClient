import {Component, OnInit, ViewChild} from '@angular/core';
import {AppStringConstants} from '../../../shared/models/app-string-constants';
import {ConfirmationModalType} from '../../../shared/models/confirmation-modal-type.enum';
import {PagedResult} from '../../../shared/models/paged-result';
import {StudentModel} from '../../models/student.model';
import {StudentsService} from '../../services/students.service';
import {FooterMessageService} from '../../../shared/services/footer-message.service';
import {Router} from '@angular/router';
import {StudentsSearchComponent} from '../students-search/students-search.component';
import {ConfirmationModalComponent} from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _pageSize = 25;

  pagedResult: PagedResult<StudentModel>;
  page = 1;
  itemsPerPageCaption = 'Records per page';

  get pageSize() {
    return this._pageSize;
  }

  set pageSize(value) {
    this._pageSize = value;
    this.page = 1;

    this.studentservice.getStudents();
  }

  get totalRows() {
    return this.pagedResult ? this.pagedResult.totalRows : 0;
  }

  get items() {
    return this.pagedResult ? this.pagedResult.items : [];
  }

  @ViewChild('confirmModal', { static : false}) confirmModal: ConfirmationModalComponent;
  @ViewChild('studentsSearch', { static : false}) studentsSearch: StudentsSearchComponent;

  constructor(
    private studentservice: StudentsService,
    private router: Router,
    private footerMessageService: FooterMessageService) { }

  ngOnInit() {
  }

  onPageChanged() {
    this.getStudents();
  }

  editStudent(StudentId) {
    return StudentId
      ? this.router.navigate(['edit-Student', StudentId])
      : this.router.navigate(['add-Student']);
  }

  addStudent() {
    return this.router.navigate(['add-student']);
  }

  deleteStudent(StudentId) {
    this.confirmModal.show(AppStringConstants.deleteStudentTitle, AppStringConstants.deleteStudentText, () => {
      this.studentservice.deleteStudent(StudentId)
        .toPromise()
        .then(() => {
          this.page = 1;
          this.getStudents();
        })
        .catch(() => {
          this.footerMessageService.pushError(AppStringConstants.deleteStudentError);
        });
    }, ConfirmationModalType.delete);
  }

  public getStudents() {
    this.studentsSearch.getStudents(this.page, this.pageSize).subscribe(res => this.pagedResult = res);
  }

}
