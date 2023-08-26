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
  idsintoma: string = '';
  sintoma: ISintoma[] = []; //array
  
  constructor(
    private modalService: NgbModal,
    private sintomaService: SintomaService) { }

  ngOnInit(): void {
  }

  eliminar(idSintoma: string) {
   Swal.fire({
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
          this.idsintoma = idSintoma;
          this.sintomaService.deleteSintoma(idSintoma)
            .subscribe(resp => this.sintomaService.listaSintomas.subscribe(
              respn => this.sintoma = respn
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
            title: 'Se elimino el Sintoma',
          });
          this.obtenerSintomas();
        }
      });

  } 

  private obtenerSintomas() {
    this.sintomaService.listaSintomas.subscribe((resp: ISintoma[]) => {
      this.sintomaOd = resp;
      console.log(resp);
    });
  }
}
