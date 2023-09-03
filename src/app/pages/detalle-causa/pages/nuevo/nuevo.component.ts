import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.css"],
})
export class NuevoComponent implements OnInit {
 
  formularioDetalleCausa!: FormGroup;
  constructor(
  
  ) {
    
  }

  ngOnInit() {
   
  }
 

  
}
