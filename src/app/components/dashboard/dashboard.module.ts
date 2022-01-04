import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearFormularioComponent } from './crear-formulario/crear-formulario.component';
import { CrearPreguntaComponent } from './crear-pregunta/crear-pregunta.component';
import { ListPreguntasComponent } from './list-preguntas/list-preguntas.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListCuestionariosComponent,
    CrearFormularioComponent,
    CrearPreguntaComponent,
    ListPreguntasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
