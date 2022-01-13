import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit,OnDestroy {

  id:string;
  loading=false ;
  listRespuestasUsuario:any[] = [];
  respuestaQuizz:Subscription = new Subscription();
  constructor(private active:ActivatedRoute, private _respuestaUsuarioServices:RespuestaCuestionarioService,
    private toastr:ToastrService) { 

    this.id = this.active.snapshot.paramMap.get('id')!;
  }
  ngOnDestroy(): void {
    this.respuestaQuizz.unsubscribe();
  }

  ngOnInit(): void { 
    this.getRespuestaByIdCuestionario();
  }


  getRespuestaByIdCuestionario(){
    this.loading = true;
    this. respuestaQuizz = this._respuestaUsuarioServices.getRespuestaByIdCuestionario(this.id).subscribe(data=>{
      this.loading = false;
      this.listRespuestasUsuario = [];
      data.forEach((element:any) => {
        this.listRespuestasUsuario.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      });

      console.log(this.listRespuestasUsuario);
    },error=>{
      console.log(error);
      this.loading = false;
    })
  }

  eliminarRespuestaUsuario(id:string){
    this.loading = true;

    this._respuestaUsuarioServices.deleteRespuestaUsuario(id).then(()=>{
      this.loading = false;

      this.toastr.info('La respuesta fue eliminada', 'Respuesta eliminada');
    })
    .catch(()=>{
      this.loading = false;
      this.toastr.error('Ocurrio un error', 'Error');
    })
  }

}
