import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IDetalleCausaDTOMostrar } from '../../interface/detalleCausa.interface';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DetalleCausaService } from '../../services/detalle-causa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input()listaDetalleCausa:IDetalleCausaDTOMostrar[]=[];
  @Output()ObjetoCausaEliminar= new EventEmitter<IDetalleCausaDTOMostrar>();
  @Output()ObjetoCausaModificar= new EventEmitter<IDetalleCausaDTOMostrar>();
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<IDetalleCausaDTOMostrar> = new Subject<IDetalleCausaDTOMostrar>();
  detalleCausa?:IDetalleCausaDTOMostrar;
  constructor(private detalleCausaService:DetalleCausaService,public modalService:NgbModal) { }

  ngOnInit(): void {
    this.dtOptions={
      lengthMenu: [5,10,15,20,50],
      destroy: true,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: "Ningun detalle causa encontrado",
      },
      pagingType: 'full_numbers',
      responsive: true
    };
    this.listDetalleCausa();
  }
  ObtenerDetalleCausaEliminar(detalleCausa:IDetalleCausaDTOMostrar){
    this.ObjetoCausaEliminar.emit(detalleCausa);//para emitar el evento de objeto a la vista del padre
  }
  ObtenerDetalleCausaModificar(detalleCausa:IDetalleCausaDTOMostrar){
    this.ObjetoCausaModificar.emit(detalleCausa);
  }
  listDetalleCausa(){
    this.detalleCausaService.listaDetalleCausa().subscribe((resp)=>{
      this.listaDetalleCausa=resp;
      this.dtTrigger.next(null);
    });
  }

  openModal(content: any,detalleCausa:IDetalleCausaDTOMostrar) {
    this.detalleCausa=detalleCausa;
    this.modalService.open(content, {
      size: "xl",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });

  }
}
