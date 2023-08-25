import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IEnfermedad } from '../../interfaces/IEnfermedad';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnfermedadService } from '../../services/enfermedad.service';
import { DataTableDirective } from 'angular-datatables';  
//import { DataTables } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<IEnfermedad> = new Subject<IEnfermedad>();




  @Input() enfermedadOd!: IEnfermedad[];
  @Input() queryString: string;
  p: any;
  card: IEnfermedad;
  idsintoma: string = '';
  enfermedades: IEnfermedad[] = []; //array
  
  constructor(
    private modalService: NgbModal, 
    private enfermedadService: EnfermedadService) { }

  ngOnInit(): void {
    this.dtOptions={
      /* columnDefs:[
        {className: "center", targets: [0,1,2,3]},
        {orderable: false, targets: [3]},
        {searchable: false, targets: [0,3]},
        {width: "15%", targets: [0]},
        {width: "50%", targets: [1,3]},
        {width: "20%", targets: [2]},
      ], */
      lengthMenu: [5,10,15,20,50],
      destroy: true,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: "Ninguna enfermedad encontrada",
      },
      pagingType: 'full_numbers',
      responsive: true,
    };
    this.obtenerEnfermedades();

  }

  private obtenerEnfermedades() {
    this.enfermedadService.listaEnfermedades.subscribe((resp: IEnfermedad[]) => {
      this.enfermedadOd = resp;
      console.log(resp);
    });
  }
}
