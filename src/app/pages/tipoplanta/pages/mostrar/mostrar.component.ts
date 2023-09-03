import { Component, OnInit } from '@angular/core';
import { ITipoPlanta } from '../../interfaces/ITipoPlanta';
import { TipoplantaService } from '../../services/tipoplanta.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {

  tipoPlanta: ITipoPlanta[] = [];//para almacenar el resultado
  offset = 0; //limite del rango de la consulta de la API
  breadCrumbItems: Array<{}>;
  term: string = '';

  constructor(private tipoPlnataService : TipoplantaService) { }

  ngOnInit(): void {

    this.tipoPlnataService.listarTipoPlanta().subscribe((resp: ITipoPlanta[]) => {
      this.tipoPlanta = resp;
      console.log(resp);
    });

  }

}
