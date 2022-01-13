import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { Pregunta } from 'src/app/models/Pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { nanoid } from 'nanoid'
import { User } from 'src/app/interfaces/User';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.css']
})
export class ListPreguntasComponent implements OnInit {

  loading:boolean;
  listPregunta : Pregunta[] = [];
  tituloCuestionario:string;
  descripcionCuestionario:string;
  constructor(private _servicesCuestionario: CuestionarioService, private router:Router, private toastr: ToastrService) {
    this.loading = false;
    this.tituloCuestionario = this._servicesCuestionario.tituloCuestionario;
    this.descripcionCuestionario = this._servicesCuestionario.descripcion;
    this._servicesCuestionario.getPreguntas().subscribe(data=>{
      this.listPregunta.push(data);
      console.log(this.listPregunta);
    })
   }

  ngOnInit(): void {
    if(this.tituloCuestionario === '' || this.descripcionCuestionario === ''){

      this.router.navigate(['/dashboard']);
    }
  }

  eliminarPregunta(index:number){

    this.listPregunta.splice(index,1);

  }


  finalizarCuestionario(){
    const codigo = this.generarCodigo();
    const usuario: User = JSON.parse(localStorage.getItem('user') || '{}');
    

    const cuestionario: Cuestionario={
      uid:usuario.uid,
      titulo: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      codigo:codigo,
      cantPreguntas:this.listPregunta.length,
      fechaCreacion:new Date(),
      listPregunta:this.listPregunta
    }

    this.loading = true;

    this._servicesCuestionario.crearCuestionario(cuestionario).then(data=>{
      this.toastr.success('El cuestionario fue registrado con exito!','Cuestionario registrado');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    })
    .catch(error=>{
      this.loading = false;
      console.log(error);
    })
    
  }

  generarCodigo():string{
    return nanoid(6).toUpperCase();
  }

}
