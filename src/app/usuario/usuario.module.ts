import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsuarioRoutingModule } from "./usuario-routing.module";
import { LoginComponent } from "./login/login.component";
import { Ng5SliderModule } from "ng5-slider";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import {
  NgbNavModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbModalModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UIModule } from "../shared/ui/ui.module";
import { WidgetModule } from "../shared/widget/widget.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { ClickOutsideModule } from "ng-click-outside";
import { SimplebarAngularModule } from "simplebar-angular";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { LayoutComponent } from "../layouts/layout.component";
import { LayoutsModule } from "../layouts/layouts.module";
import { NgxPaginationModule } from "ngx-pagination";
import { DataTablesModule } from "angular-datatables";
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [LoginComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    UIModule,
    WidgetModule,
    Ng5SliderModule,
    NgSelectModule,
    NgbPaginationModule,
    TranslateModule,
    RouterModule,
    NgbDropdownModule,
    ClickOutsideModule,
    SimplebarAngularModule,
    DropzoneModule,
    LayoutsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //PARA LA PAGINACION
    DataTablesModule
  ],
})
export class UsuarioModule {}
