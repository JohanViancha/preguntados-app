import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  error:boolean;
  pin:string;
  constructor() {
    this.error = false;
    this.pin = '';
   }

  ngOnInit(): void {
  }

  ingresar(){
    //Si el usuario no ingreso ningun caracter

    if(!this.pin){
      this.error = true;

      setTimeout(()=>{
        this.error = false;
      },2000);
    }
  }
}
