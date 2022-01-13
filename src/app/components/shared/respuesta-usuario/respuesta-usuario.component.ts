import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.css']
})
export class RespuestaUsuarioComponent implements OnInit {

  id:string;
  loading:boolean = false;
  respuestaCuestionario:any;
  rutaAnterior = '';
  constructor(private _respuestaUsuarioService: RespuestaCuestionarioService, private route:ActivatedRoute,
    private router:Router) { 
    this.rutaAnterior = this.route.snapshot.url[0].path;
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.obtenerRespuestaUsuario();
  }


  obtenerRespuestaUsuario(){

    this.loading = true;
    this._respuestaUsuarioService.getRespuestaUsuario(this.id).subscribe(doc=>{
      this.loading = false;
      if(!doc.exists){
        this.router.navigate(['/']);
        return;
      }
      this.respuestaCuestionario = doc.data();
    },(err)=>{
      this.loading = false;
      console.log(err);
    })
  }


  volver(){

    if(this.rutaAnterior === 'respuestaUsuarioAdmin'){
      this.router.navigate(['/dashboard/estadisticas', this.respuestaCuestionario.idCuestionario]);
    }else{
      this.router.navigate(['/']);
    }
  }
}
