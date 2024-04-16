// modal.component.ts
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() modalTitle: string = 'Modal Title'
  @Input() showCancelButton = true
  @Output() modalDismissed = new EventEmitter<void>()

  @ViewChild('modalContent') modalBodyRef!: ElementRef

  constructor(private modalService: NgbModal) {}

  open(options?:NgbModalOptions): void {
    this.modalService.open(this.modalBodyRef, options)
  }

  close(): void {
    this.modalService.dismissAll()
    this.modalDismissed.emit()
  }
}
