import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Respuesta } from 'src/app/models/Respuesta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.css']
})
export class CrearPreguntaComponent implements OnInit {
  mostrarError:boolean;
  agregarPregunta:FormGroup;
  constructor(private _serviceFormulario: CuestionarioService, private fb:FormBuilder) { 
    this.mostrarError = false;
    this.agregarPregunta = this.fb.group({
      titulo:['', Validators.required],
      segundos:[10,Validators.required],
      puntos:[1000, Validators.required],
      respuesta1:this.fb.group({
        titulo:['', Validators.required],
        esCorrecta:[false, Validators.required]
      }),

      respuesta2:this.fb.group({
        titulo:['', Validators.required],
        esCorrecta:[false, Validators.required]
      }),


      respuesta3:this.fb.group({
        titulo:'',
        esCorrecta:false
      }),

      respuesta4:this.fb.group({
        titulo:'',
        esCorrecta:false
      }),

    })
  }

  get seg(){return this.agregarPregunta.get('segundos')?.value}
  get puntos(){return this.agregarPregunta.get('puntos')?.value}
  
  ngOnInit(): void {

  }

  agregarPreg(){
  
    if(this.agregarPregunta.invalid || !this.todasIncorrecta()){
      this.error();
      return;
    }

    let listRespuesta: Respuesta[] =[];
    const rtaTitulo1 = this.agregarPregunta.get('respuesta1')?.get('titulo')?.value;
    const esCorrecta1 = this.agregarPregunta.get('respuesta1')?.get('esCorrecta')?.value;

    const respuesta1 : any= {
      descripcion:rtaTitulo1,
      esCorrecta:esCorrecta1
    }

    const rtaTitulo2 = this.agregarPregunta.get('respuesta2')?.get('titulo')?.value;
    const esCorrecta2 = this.agregarPregunta.get('respuesta2')?.get('esCorrecta')?.value;

    const respuesta2 : any= {
      descripcion:rtaTitulo2,
      esCorrecta:esCorrecta2
    }

    const rtaTitulo3 = this.agregarPregunta.get('respuesta3')?.get('titulo')?.value;
    const esCorrecta3 = this.agregarPregunta.get('respuesta3')?.get('esCorrecta')?.value;

    const respuesta3 : any= {
      descripcion:rtaTitulo3,
      esCorrecta:esCorrecta3
    }

    const rtaTitulo4 = this.agregarPregunta.get('respuesta4')?.get('titulo')?.value;
    const esCorrecta4 = this.agregarPregunta.get('respuesta4')?.get('esCorrecta')?.value;

    const respuesta4 : any= {
      descripcion:rtaTitulo4,
      esCorrecta:esCorrecta4
    }
    
    listRespuesta.push(respuesta1);
    listRespuesta.push(respuesta2);
    if(rtaTitulo3 !== ''){
      listRespuesta.push(respuesta3);
    }
    if(rtaTitulo4 !== ''){
      listRespuesta.push(respuesta4);
    }
  
  }

  todasIncorrecta(){
    const valuePregunta = (Object.values(this.agregarPregunta.value));
    const response = (valuePregunta.slice(3,7).find(({esCorrecta}:any)=>esCorrecta));
    return response?response:false;
  }

  error(){
    //Mostramos por tres segundos el error
    this.mostrarError = true;
    setTimeout(()=>{
      this.mostrarError = false;
    }, 3000)
  }

  sumarRestarSegundos(numero:number):void{

    if(numero !==-1 || this.seg>=2){
      this.agregarPregunta.patchValue({
        segundos: this.seg+numero
      })
    }
  }

  esCorrecta(rta:string){

      this.setFalseRepuesta(rta);
      const estadoRta = this.obtenerEstadoRespuesta(`respuesta${rta}`);
      this.agregarPregunta.get(`respuesta${rta}`)?.patchValue({
        esCorrecta: !estadoRta
      })
  }

  obtenerEstadoRespuesta(rta:string):boolean{

    return this.agregarPregunta.get(rta)?.get('esCorrecta')?.value;
  }

  setFalseRepuesta(nroRespuesta:string){
    const array = ['respuesta1','respuesta2','respuesta3','respuesta4'];
    for (let index = 0; index < array.length; index++) {
      if(array[index] !== nroRespuesta){

        this.agregarPregunta.get(array[index])?.patchValue({
          esCorrecta:false
        })

      }
      
    }
  }
}
