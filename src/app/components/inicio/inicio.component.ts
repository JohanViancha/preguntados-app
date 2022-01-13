
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {

  error:boolean;
  pin:string;
  errorText:string = '';
  loading = false;
  subscriptionCode: Subscription = new Subscription();
  constructor(private _respuestaCuestionario: RespuestaCuestionarioService, private router:Router) {
    this.error = false;
    this.pin = '';
   }


  ngOnDestroy(): void {
    this.subscriptionCode.unsubscribe();
  }

  ngOnInit(): void {
  }

  ingresar(){
    //Si el usuario no ingreso ningun caracter
    
    if(!this.pin){
      this.errorMensaje('Por favor ingrese PIN');
      return;
    }
    this.loading = true;
    this.subscriptionCode = this._respuestaCuestionario.searchByCode(this.pin).subscribe(data=>{
      this.loading = false;
      if(data.empty){
        this.errorMensaje('PIN invalido'); 
       
      }else{
        data.forEach((element:any) => {
          const cuestionario:Cuestionario = {
            id:element.id,
            ...element.data()
          }

          this._respuestaCuestionario.cuestionario = cuestionario;

          this.router.navigate(['/jugar']);
        });
      }
    },error=>{

      console.log(error);
    });
  }

  errorMensaje(text:string){
    this.errorText = text;
    this.error = true;
    this.pin = '';


    //Mostramos el error por cuatro segundos

    setTimeout(()=>{
      this.error = false;
    },4000)
  }
}
