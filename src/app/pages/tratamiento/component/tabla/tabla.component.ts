import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITratamientoMostrar } from '../../interface/tratamiento.interface';
import { TratamientoService } from '../../service/service.service';
import { DomSanitizer } from '@angular/platform-browser';


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
  constructor() { }

  ngOnInit(): void {
    
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
