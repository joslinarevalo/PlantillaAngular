import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TratamientoService } from 'src/app/pages/tratamiento/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITratamientoConsulta, ITratamientoMostrar } from 'src/app/pages/tratamiento/interface/tratamiento.interface';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  imagen: any;
  //causa:ITipoCausa
  tratamiento: ITratamientoMostrar | undefined;
  listEnfermedades:ITratamientoConsulta[]=[];
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ITratamientoMostrar> = new Subject<ITratamientoMostrar>();
  constructor(private tratamientoService:TratamientoService, private route: ActivatedRoute,
    private dm: DomSanitizer,private router: Router) {}

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
    this.route.params.subscribe((params) => {
      const idtratamiento = params["idTratamiento"];
      // Utiliza idTipoCausa para cargar los detalles del elemento específico
      this.buscartratamiento(idtratamiento);
    });

  }
  buscartratamiento(idtratamiento: string) {
    // Buscamos el patógeno específico por su id
    this.tratamientoService.buscarTratamiento(idtratamiento).subscribe(
      (data) => {
        this.tratamiento = data;
        this.ObtenerImagen(this.tratamiento.urlTratamiento);
        this.listaEnfermedades(idtratamiento);
      },
      (error) => {
        console.error("Error al obtener los detalles de la tratamiento:", error);
      }
    );
  }
  listaEnfermedades(idTratamiento:string){
    this.tratamientoService.listaDeTratamientoConsulta(idTratamiento).subscribe((resp)=>{
      this.listEnfermedades=resp;
      this.dtTrigger.next(null);
    })
  }


  ObtenerImagen(url: string) {
    this.tratamientoService.getImagen(url).subscribe((resp) => {
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      this.tratamiento.urlTratamiento = this.imagen;
    });
  }
  ObtenerEnfermedad(idEnfermedad:string){
    this.router.navigate(['consultaEnfermedades/detalle', idEnfermedad]);
  }
  ObtenerPlanta(idplanta:string){
   // this.router.navigate(['consultaPlanta/detalle', idplanta]);
  }

}
