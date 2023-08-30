import { Component, Input, OnInit } from '@angular/core';
import { IEnfermedad } from '../../interfaces/IEnfermedad';
import { EnfermedadService } from '../../services/enfermedad.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {
  enfermedades: IEnfermedad[] = [];//para almacenar el resultado
  offset = 0; //limite del rango de la consulta de la API
  breadCrumbItems: Array<{}>;
  term: string = '';
  proceso: string = 'Nueva enfermedad';

  @Input() producto!: IEnfermedad;

  constructor(private enfermedadService: EnfermedadService) { }

  ngOnInit(): void {

    this.enfermedadService.listaEnfermedades.subscribe((resp: IEnfermedad[]) => {
      this.enfermedades = resp;
      console.log(resp);
    });
  }
}
