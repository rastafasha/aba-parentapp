import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridHomeComponent } from './grid-home/grid-home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { SignosvitalesComponent } from './signosvitales/signosvitales.component';



@NgModule({
  declarations: [
    GridHomeComponent,
    PublicidadComponent,
    SignosvitalesComponent
  ],
  exports: [
    GridHomeComponent,
    PublicidadComponent,
    SignosvitalesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class ComponentsModule { }
