import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CausaenfermedadService } from '../../services/causaenfermedad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { TipoCausa } from '../../models/TipoCausa';

@Component({
  selector: 'app-tablaCausa',
  templateUrl: './tablaCausa.component.html',
  styleUrls: ['./tablaCausa.component.scss']
})
export class TablaCausaComponent implements OnInit {
  constructor(private causaenfermedad:CausaenfermedadService,private router: Router) { }
  //@Input()allcausa!:TipoCausa[];
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  cusaT: TipoCausa[];
  @Input() queryString: string;
  @Input()alltipocausa!:TipoCausa[];
  ngOnInit() {
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
    this.obtenertipocausa();
  }
  obtenertipocausa(){
    this.causaenfermedad.getcausaenfermedad()
    .subscribe(data => {
      this.cusaT = data;
      console.log(data);
    });
  }
  eliminarcausa(cusatp:TipoCausa) {
 
      Swal.fire({
        title: 'Estas seguro de Eliminar?',
        text: "No podrás revertir esto!",
        icon: 'warning',
       showDenyButton:true,
       showCancelButton:true,
       confirmButtonText:'Borrar',
       denyButtonText:'No guardar',
      }).then((result)=>{
        if(result.isConfirmed){
          this.causaenfermedad.eliminar(cusatp).subscribe(resp=>{
            console.log(resp);
              if(!resp){
                Swal.fire( 'Eliminado!',
                'El registro ha sido eliminado.',
                'success');
             
              }else {
                Swal.fire('Error, hable con el administrador','','warning')
              }
              this.recargar() ;
           });
        }else if(result.isDenied){
          Swal.fire('cambios aplicados','','info')
        }
      });
  }
  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
