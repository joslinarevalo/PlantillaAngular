import { Component, Input, OnInit } from '@angular/core';
import { DetalleCausa } from '../../models/DetalleCausa';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  detalleCausa:string='';
  term: string = '';
  @Input() dtcausa: DetalleCausa[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}
