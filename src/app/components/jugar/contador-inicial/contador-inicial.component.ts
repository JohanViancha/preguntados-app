
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contador-inicial',
  templateUrl: './contador-inicial.component.html',
  styleUrls: ['./contador-inicial.component.css']
})
export class ContadorInicialComponent implements OnInit, OnDestroy {

  contador = 3;
  constInterval : any;
  constructor(private router: Router) { }
 

  ngOnInit(): void {
    this.playContadorInicial();
  }

  playContadorInicial(){

    this.constInterval = setInterval(()=>{
      this.contador -=1;
      if(this.contador === -1){
        this.router.navigate(['/jugar/realizarQuizz'])
      }
    },1000)

  }

  ngOnDestroy(): void {
    clearInterval(this.constInterval);
  }

}
