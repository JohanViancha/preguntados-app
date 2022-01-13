import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';
import { RespuestaUsuarioComponent } from '../shared/respuesta-usuario/respuesta-usuario.component';
import { CrearFormularioComponent } from './crear-formulario/crear-formulario.component';
import { CrearPreguntaComponent } from './crear-pregunta/crear-pregunta.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { VerCuestionarioComponent } from './ver-cuestionario/ver-cuestionario.component';

const routes: Routes = [
  {path:'',component:ListCuestionariosComponent},
  {path:'crearFormulario',component:CrearFormularioComponent},
  {path:'crearPreguntas', component: CrearPreguntaComponent},
  {path:'verCuestionario/:id', component: VerCuestionarioComponent},
  {path:'estadisticas/:id', component: EstadisticasComponent},
  {path:'respuestaUsuarioAdmin/:id', component: RespuestaUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
