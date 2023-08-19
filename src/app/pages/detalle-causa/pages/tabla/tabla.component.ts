import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DetalleCausa, IConsulta } from '../../models/DetalleCausa';
import { DetallecausaService } from '../../services/detallecausa.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  detalleCausa: DetalleCausa[] = [];
  @Input() ldetalleC!: DetalleCausa[];
  @Input() queryString: string;
  @Input()allConsultas!:IConsulta[];
  p: any;
  constructor(private detallecausaservice:DetallecausaService) { }

  ngOnInit() {
    //this.obtener();
    this.obtenerconsulta();
  }
  obtener() {
    this.detallecausaservice.getdetalleCausa()
      .subscribe(data => {
        this.detalleCausa = data;//
        console.log(data);
      });
  }
  obtenerconsulta(){
    this.detallecausaservice.getConsultas()
    .subscribe(data => {
      this.allConsultas = data;
      console.log(data);
    });
  }
 
}
