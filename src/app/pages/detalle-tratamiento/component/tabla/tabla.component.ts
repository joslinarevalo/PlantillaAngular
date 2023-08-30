import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IDetalleTratamientoDTOMostrar } from '../../interface/detalleTratamiento.interface';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';  
import { DetalleTratamientoService } from '../../service/detalle-tratamiento.service';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input()listaDetalleTratamiento:IDetalleTratamientoDTOMostrar[]=[];
  @Output()ObjetoTratamientoEliminar= new EventEmitter<IDetalleTratamientoDTOMostrar>();
  @Output()ObjetoTratamientoModificar= new EventEmitter<IDetalleTratamientoDTOMostrar>();
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
 // dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject<IDetalleTratamientoDTOMostrar> = new Subject<IDetalleTratamientoDTOMostrar>();
  constructor() { }

  ngOnInit(): void {
    /*this.dtOptions={
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
    */
    
  }
  ObtenerDetalleTratamientoEliminar(detalleTratamiento:IDetalleTratamientoDTOMostrar){
    console.log(detalleTratamiento);
    this.ObjetoTratamientoEliminar.emit(detalleTratamiento);//para emitar el evento de objeto a la vista del padre
  }
  ObtenerDetalleTratamientoModificar(detalleTratamiento:IDetalleTratamientoDTOMostrar){
    console.log(detalleTratamiento);
    this.ObjetoTratamientoModificar.emit(detalleTratamiento);
  }

}
