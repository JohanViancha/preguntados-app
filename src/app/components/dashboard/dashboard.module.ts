import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearFormularioComponent } from './crear-formulario/crear-formulario.component';
import { CrearPreguntaComponent } from './crear-pregunta/crear-pregunta.component';
import { ListPreguntasComponent } from './list-preguntas/list-preguntas.component';
import { SharedModule } from '../shared/shared.module';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListCuestionariosComponent,
    CrearFormularioComponent,
    CrearPreguntaComponent,
    ListPreguntasComponent,
    VerCuestionarioComponent,
    EstadisticasComponent
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
