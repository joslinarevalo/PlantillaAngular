import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IEnfermedadMostrar } from '../../interfaces/IEnfermedad';
import { DataTableDirective } from 'angular-datatables';  

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject<IEnfermedad> = new Subject<IEnfermedad>();

  p: any;
  imagen:any;
  //tratamientoList:ITratamientoMostrar[]=[];
  @Input()listaEnfermedades:IEnfermedadMostrar[]=[];
  @Output()ObjetoTratamientoEliminar= new EventEmitter<IEnfermedadMostrar>();
  @Output()ObjetoTratamientoModificar= new EventEmitter<IEnfermedadMostrar>();
  
  constructor() { }

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
  }
  
  obtenerEnfermedadEliminar(tratamiento:IEnfermedadMostrar){
    console.log(tratamiento);
    this.ObjetoTratamientoEliminar.emit(tratamiento);//para emitar el evento de objeto a la vista del padre
  }
  
  obtenerEnfermedadModificar(tratamiento:IEnfermedadMostrar){
    console.log(tratamiento);
    this.ObjetoTratamientoModificar.emit(tratamiento);
  }
}
