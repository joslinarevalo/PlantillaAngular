import { Component, Input, OnInit } from '@angular/core';
import { TipoplantaService } from '../../services/tipoplanta.service';
import { ITipoPlanta } from '../../interfaces/ITipoPlanta';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() tipoPlantaOd!: ITipoPlanta[];
  @Input() queryString: string;

  p: any;
  card: ITipoPlanta;
  idtipo: string = '';
  producto: ITipoPlanta[] = [];

  constructor(private tipoPlnataService : TipoplantaService) { }

  ngOnInit(): void {
  }

  private obtenerTipos() {
    this.tipoPlnataService.listarTipoPlanta().subscribe((resp: ITipoPlanta[]) =>{
      this.tipoPlantaOd = resp;
      console.log(resp);
    });

  }

  /*borrar(i: IMunicipiost) {
    Swal.fire({
      title: '¿Esta seguro de eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        console.log("ESte es el valor " + i.idM)
        this.muniservice.eliminarMunicipio(i).subscribe(resp => {
          console.log(resp);
          if (resp) {
            Swal.fire('Borrado con exito', '', 'success');
            this.cargarMunicipios();
          } else {
            Swal.fire('Error hable con el administrador', '', 'warning');
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Cambios no aplicados', '', 'info')
      }
    });
  }*/

}
