import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ISintoma } from '../../interfaces/ISintoma';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SintomaService } from '../../services/sintoma.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input() sintomaOd!: ISintoma[];
  @Input() queryString: string;
  p: any;
  card: ISintoma;
  idproducto: string = '';
  producto: ISintoma[] = []; //array de productos
  
  constructor(
    private modalService: NgbModal, 
    private sintomaService: SintomaService) { }

  ngOnInit(): void {
  }

  eliminar(idProducto: string) {
   /* Swal.fire({
      title: "Eliminacion",
      text: "¿Desea eliminar el Sintoma?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#AF1717',
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })
      .then(resultado => {
        if (resultado.value) {
          this.idproducto = idProducto;
          this.sintomaService.deleteProducto(idProducto)
            .subscribe(resp => this.sintomaService.listaProductos.subscribe(
              respn => this.producto = respn
            )
            );
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Se elimino el producto',
          });
          this.obtenerProductos();
        }
      });
*/
  } 

  private obtenerProductos() {
    this.sintomaService.listaSintomas.subscribe((resp: ISintoma[]) => {
      this.sintomaOd = resp;
      console.log(resp);
    });
  }
}
