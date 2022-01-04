import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFormularioComponent } from './crear-formulario/crear-formulario.component';
import { CrearPreguntaComponent } from './crear-pregunta/crear-pregunta.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';

const routes: Routes = [
  {path:'',component:ListCuestionariosComponent},
  {path:'crearFormulario',component:CrearFormularioComponent},
  {path:'crearPreguntas', component: CrearPreguntaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
