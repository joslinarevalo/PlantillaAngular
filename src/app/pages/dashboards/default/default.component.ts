import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {

    /**
     * horizontal-vertical layput set
     */
     const attribute = document.body.getAttribute('data-layout');
  }
  /**
   * Change the layout onclick
   * @param layout Change the layout
   */

}
