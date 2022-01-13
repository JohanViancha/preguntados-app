import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit, OnDestroy {

  cuestionario!:Cuestionario;
  nombreParcipante:string = '';
  indexPregunta:number = 0;
  segundos:number = 0;
  setInterval:any;
  loading:boolean = false;

  opcionSeleccionada:any=null;
  indexSeleccionado:any;

  cantidadCorrectas:number=0;
  cantidadIncorrectas:number=0;
  puntosTotales:number =0;
  listRespuestaUsuario:any[] = [];


  constructor(private _respuestaQuizzService:RespuestaCuestionarioService, private router:Router) { }
  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }

  ngOnInit(): void {

    this.nombreParcipante = this._respuestaQuizzService.nombreParcipante;
    this.cuestionario = this._respuestaQuizzService.cuestionario;
    this.validateRefresh();
    this.iniciarContador();
  }

  validateRefresh(){
    if(this.cuestionario === undefined){
      this.router.navigate(['/'])
    }
  }

  obtenerSegundos():number{
    return this.segundos;
  }

  obtnerTitulo():string{
    return this.cuestionario.listPregunta[this.indexPregunta].titulo;
  }

  iniciarContador(){
    this.segundos = this.cuestionario.listPregunta[this.indexPregunta].segundos;

    this.setInterval = setInterval(()=>{ 
      if(this.segundos === 0){
        this.agregarRespuesta();
      }
      this.segundos -=1;
    },1000)
  }


  respuestaSeleccionada(respueta:any, index:number){
    this.opcionSeleccionada = respueta;
    this.indexSeleccionado = index;
  }

  addClassOption(respuesta:any):string{
    if(respuesta === this.opcionSeleccionada){
      return 'classSeleccionada';
    }
    return '';
  }


  sigueiente(){
    clearInterval(this.setInterval);
    this.agregarRespuesta();
    this.iniciarContador();
  }

  agregarRespuesta(){

    //Incrementamos contadores (Correcta y incorrecta)
    this.contadorCorrectaIncorrecta();

    //Creamos objeto respuesta y lo agregamos al array
    const respuestaUsuario:any={
      titulo:this.cuestionario.listPregunta[this.indexPregunta].titulo,
      puntosObtenidos: this.obtenerPuntosPreguntas(),
      segundos:this.obtenerSegundosPreguntas(),
      indexRespuestaSeleccionada:this.obtenerIndexSeleccionado(),
      listRespuesta:this.cuestionario.listPregunta[this.indexPregunta].listRespuesta

    }

    this.listRespuestaUsuario.push(respuestaUsuario);

    this.opcionSeleccionada = undefined;
    this.indexSeleccionado = undefined;

    if(this.cuestionario.listPregunta.length -1 === this.indexPregunta){
      
      //Guardamos las respuestas del formulario
      this.guardarRespuestaFormulario();
      //Se guardan las preguntas en firebase
      this.router.navigate(['/jugar/respuestaUsuario']);
    }else{
      this.indexPregunta++;
      this.segundos = this.cuestionario.listPregunta[this.indexPregunta].segundos;
    }
    
  }

  obtenerPuntosPreguntas():number{
    //Si el usuario no selecciono ninguna pregunta 
    if(this.opcionSeleccionada === undefined){
      return 0;
    }

    const puntosPregunta = this.cuestionario.listPregunta[this.indexPregunta].puntos;

    //Validamos si la pregunta es correcta
    if(this.opcionSeleccionada.esCorrecta == true){
      //Incrementamos la variable puntos Totales...
      this.puntosTotales = this.puntosTotales + puntosPregunta;
      return this.puntosTotales;
    }else{
      return 0;
    }
  }

  obtenerSegundosPreguntas():string{
    //Validamos si el usuario no respondio la pregunta
  
    if(this.opcionSeleccionada === undefined){
      return 'No respondio'
    }else {
      const segundosPregunta = this.cuestionario.listPregunta[this.indexPregunta].segundos;

      const segundosRespondidos = segundosPregunta - this.segundos;

      return segundosRespondidos.toString();
    }
  }

  obtenerIndexSeleccionado():any{
    if(this.opcionSeleccionada === undefined){
      return '';
    }else{
      return this.indexSeleccionado;
    }
  }

  contadorCorrectaIncorrecta(){
    //Validamos y el usuario selecciono pregunta

    if(this.opcionSeleccionada === undefined){
      this.cantidadIncorrectas++;
      return;
    }

    //Preguntamos si la opción es incorrecta
    if(!this.opcionSeleccionada.esCorrecta){
      this.cantidadIncorrectas++;
    }else{
      this.cantidadCorrectas++;
    }
  }

  guardarRespuestaFormulario(){
    const respuestaCuestionario:any = {
      idCuestionario: this.cuestionario.id,
      nombreParcipante: this.nombreParcipante,
      fecha: new Date(),
      cantidadPreguntas:this.cuestionario.cantPreguntas,
      cantidadIncorrecta:this.cantidadIncorrectas,
      cantidadCorrecta:this.cantidadCorrectas,
      puntosTotales:this.puntosTotales,
      listRespuestaUsuario:this.listRespuestaUsuario
    }

    this.loading= true;
    this._respuestaQuizzService.setRespuestaUsuario(respuestaCuestionario).then(data=>{

      this.router.navigate(['/jugar/respuestaUsuario', data.id]);
    })
    .catch((error)=>{
      console.log(error);
      this.router.navigate(['/']);
    })
  }
}
