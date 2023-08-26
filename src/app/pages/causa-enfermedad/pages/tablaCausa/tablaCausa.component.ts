import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TipoCausa } from 'src/app/pages/detalle-causa/models/DetalleCausa';
import { CausaenfermedadService } from '../../services/causaenfermedad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

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
