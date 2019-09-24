import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ConfirmationModalType} from '../../models/confirmation-modal-type.enum';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  ConfirmationModalType = ConfirmationModalType;

  modalRef: NgbActiveModal;
  @ViewChild('modalContent', { static : false}) modalContent: TemplateRef<any>;
  @Input() confirm: () => any;
  @Input() text: string;
  @Input() title: string;
  @Input() confirmationModalType: ConfirmationModalType;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  show(title: string, text: string, confirmFn: () => any, type: ConfirmationModalType): void {
    if (confirmFn != null) {
      this.confirm = confirmFn;
    }

    this.text = text;
    this.title = title;
    this.confirmationModalType = type;

    this.modalRef = this.modalService.open(this.modalContent, { centered: true });
  }

  confirmClick() {
    this.modalRef.close();
    if(this.confirm != null) {
      this.confirm();
    }
    this.close.emit(true);
  }

  declineClick() {
    this.modalRef.close();
    this.close.emit(false);
  }
}
