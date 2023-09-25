import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleCausa } from '../../models/DetalleCausa';

@Component({
  selector: 'app-VerDetalle',
  templateUrl: './VerDetalle.component.html',
  styleUrls: ['./VerDetalle.component.scss']
})
export class VerDetalleComponent implements OnInit {
  @Input() detalledto!: DetalleCausa;

  constructor( private modalService: NgbModal,) { }

  ngOnInit() {
  }
  openModal(content: any) {
    this.modalService.open(content, {
      size: "xl",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
  }
  
}
