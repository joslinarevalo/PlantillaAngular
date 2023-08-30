import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ITratamientoMostrar } from '../../interface/tratamiento.interface';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  p: any;
  imagen:any;
  //tratamientoList:ITratamientoMostrar[]=[];
  @Input()ListaDeTratamiento:ITratamientoMostrar[]=[];
  @Output()ObjetoTratamientoEliminar= new EventEmitter<ITratamientoMostrar>();
  @Output()ObjetoTratamientoModificar= new EventEmitter<ITratamientoMostrar>();
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ITratamientoMostrar> = new Subject<ITratamientoMostrar>();
  constructor() { }

  ngOnInit(): void {
    this.dtOptions={
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

  ObtenerTratamientoEliminar(tratamiento:ITratamientoMostrar){
    console.log(tratamiento);
    this.ObjetoTratamientoEliminar.emit(tratamiento);//para emitar el evento de objeto a la vista del padre
  }
  ObtenerTratamientoModificar(tratamiento:ITratamientoMostrar){
    console.log(tratamiento);
    this.ObjetoTratamientoModificar.emit(tratamiento);
  }
}
