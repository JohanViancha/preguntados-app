import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {

  nombre:string='';
  errorText='';
  error= false;
  constructor(private _respuestaCuestionarioService:RespuestaCuestionarioService, private router:Router) {

   }

  ngOnInit(): void {
    this.validarRefresh();
  }

  ingresarNombre(){

    if(this.nombre === ''){
      this.errorMensaje('Ingrese su nombre');
      return;
    }
    this._respuestaCuestionarioService.nombreParcipante = this.nombre;
    this.router.navigate(['jugar/iniciarContador'])
  }


  validarRefresh(){
    if(this._respuestaCuestionarioService.cuestionario === undefined){
      this.router.navigate(['/'])
    }
  }

  errorMensaje(text:string){
    this.errorText = text;
    this.error = true;

    //Mostramos el error por cuatro segundos

    setTimeout(()=>{
      this.error = false;
    },4000)
  }

}
