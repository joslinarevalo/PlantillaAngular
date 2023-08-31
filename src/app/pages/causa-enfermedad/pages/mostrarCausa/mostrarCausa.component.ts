import { Component, Input, OnInit } from '@angular/core';
import { TipoCausa } from '../../models/TipoCausa';

@Component({
  selector: 'app-mostrarCausa',
  templateUrl: './mostrarCausa.component.html',
  styleUrls: ['./mostrarCausa.component.scss']
})
export class MostrarCausaComponent implements OnInit {
  ctipo:string='';
  @Input() tpcausa: TipoCausa[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}
