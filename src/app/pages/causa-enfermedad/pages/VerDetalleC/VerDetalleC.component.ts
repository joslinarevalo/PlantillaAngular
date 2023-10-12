import { Component, Input, OnInit } from '@angular/core';
import { ITipoCausa } from '../../models/TipoCausa';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-VerDetalleC',
  templateUrl: './VerDetalleC.component.html',
  styleUrls: ['./VerDetalleC.component.css']
})
export class VerDetalleCComponent implements OnInit {
  @Input() detalledto!: ITipoCausa;
  constructor(private modalService: NgbModal,) { }

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
