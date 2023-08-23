import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent implements OnInit {
  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'lg', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
  };

  constructor(public modalService:NgbModal) { }

  ngOnInit(): void {
  }
  openModal(content: any) {
    this.modalService.open(content, this.modalOptions);
  }


}
