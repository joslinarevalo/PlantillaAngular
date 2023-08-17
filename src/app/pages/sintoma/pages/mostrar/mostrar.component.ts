import { Component, Input, OnInit } from '@angular/core';
import { ISintoma } from '../../interfaces/ISintoma';
import { SintomaService } from '../../services/sintoma.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {

  sintomas: ISintoma[] = [];//para almacenar el resultado
  offset = 0; //limite del rango de la consulta de la API
  breadCrumbItems: Array<{}>;
  term: string = '';
  proceso: string = 'Nuevo Sintoma';

  @Input() producto!: ISintoma;

  ///

  constructor(private sintomaService: SintomaService) { }

  ngOnInit(): void {

    this.sintomaService.listaSintomas.subscribe((resp: ISintoma[]) => {
      this.sintomas = resp;
      console.log(resp);
    });

  }

}
