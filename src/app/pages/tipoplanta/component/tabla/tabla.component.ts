import { Component, Input, EventEmitter, OnDestroy, OnInit, Output , ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


import { DomSanitizer } from '@angular/platform-browser';
import { Itipoplanta } from '../../interfaces/ITipoPlanta';
import { TipoplantaService } from '../../services/tipoplanta.service';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit, OnDestroy {

  breadCrumbItems: Array<{}>;

  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<Itipoplanta> = new Subject<Itipoplanta>();

  p: any;

  @Input()listaTipoPlantas:Itipoplanta[]=[];
  @Output()ObjetoTipoPlantaEliminar= new EventEmitter<Itipoplanta>();
  @Output()ObjetoTipoPlantaModificar= new EventEmitter<Itipoplanta>();

  constructor(private serviceTipoPlanta:TipoplantaService,
    private dm:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.dtOptions={

       columnDefs: [
        { responsivePriority: 1, targets: -1 },
        {width: "5%", targets: [0]},
        {width: "75%", targets: [1]},
        {width: "20%", targets: [2]},
       ],
       lengthMenu: [5,10,50],
       destroy: true,
       language:{
         url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json',
         lengthMenu: 'Mostrar _MENU_ registros por página',
         zeroRecords: "Ningun tipo de planta encontrado",
       },
       pagingType: 'full_numbers',
       responsive: true,
     };
     this.lista();
  }

  lista() {
    this.serviceTipoPlanta.listarTipoPlanta().subscribe((lista) => {
      this.listaTipoPlantas = lista;
      this.dtTrigger.next(null);
      });
    };


    obtenerTipoPlantaEliminar(tipo:Itipoplanta){
      console.log("A eliminar "+tipo);
      this.ObjetoTipoPlantaEliminar.emit(tipo);//para emitar el evento de objeto a la vista del padre
    }

    obtenerTipoPlantaModificar(tipo:Itipoplanta){
      console.log("A modificar " + tipo);
      this.ObjetoTipoPlantaModificar.emit(tipo);//para emitar el evento de objeto a la vista del padre
    }

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }


}
