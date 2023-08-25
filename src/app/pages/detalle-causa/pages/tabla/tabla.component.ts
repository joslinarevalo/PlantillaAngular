import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DTOdetalle, DetalleCausa} from '../../models/DetalleCausa';
import { DetallecausaService } from '../../services/detallecausa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  detalleCausa: DetalleCausa[] = [];
  
  @Input() queryString: string;
  @Input()allConsultas!:DTOdetalle[];

  iddetallito: string = "";
  p: any;
  constructor(private detallecausaservice:DetallecausaService,private router: Router) { }

  ngOnInit() {

    this.obtenerconsulta();
  }

  obtenerconsulta(){
    this.detallecausaservice.getdetalleCausa()
    .subscribe(data => {
      this.detalleCausa = data;
      console.log(data);
    });
  }
  eliminar(id: number) {

    this.detallecausaservice.eliminar(id).subscribe((resp: any) => {
      if (resp) {
         const alert = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        alert.fire({
          title: 'Estas seguro?',
          text: "No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si borrar!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            alert.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success'
            )
              this.recargar();
          } else if (
    
            result.dismiss === Swal.DismissReason.cancel
          ) {
            alert.fire(
              'Cancelado',
              'error'
            )
          }
        });
    
      }
    }, (err: any) => {
      /* console.log(err); */
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    })
  }
  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
