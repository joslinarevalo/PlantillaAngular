import { Component, Input, OnInit } from '@angular/core';
import { IDetalleTratamiento } from 'src/app/pages/detalle-tratamiento/interface/detalleTratamiento.interface';


@Component({
  selector: 'app-DetalleTraCard',
  templateUrl: './DetalleTraCard.component.html',
  styleUrls: ['./DetalleTraCard.component.css']
})
export class DetalleTraCardComponent implements OnInit {
  @Input() tratamientoDetalle: IDetalleTratamiento;
  constructor() { }

  ngOnInit() {
    

  }

}
