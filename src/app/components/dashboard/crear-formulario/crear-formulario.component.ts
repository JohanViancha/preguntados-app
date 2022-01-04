import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-formulario.component.html',
  styleUrls: ['./crear-formulario.component.css']
})
export class CrearFormularioComponent implements OnInit {

  cuestionarioForm:FormGroup;
  mostrarError:boolean;

  constructor(private fb:FormBuilder, private router:Router, private _serviceFormulario:CuestionarioService) {
    this.mostrarError = false;
    this.cuestionarioForm = this.fb.group({
      titulo:['', Validators.required],
      descripcion:['', Validators.required]
    })
   }

  ngOnInit(): void {
  }


  siguiente(){
    if(this.cuestionarioForm.invalid){
      this.mostrarError = true;
      setTimeout(()=>{
          this.mostrarError = false;
      },3000)
    }else{
        this._serviceFormulario.tituloCuestionario = this.cuestionarioForm.get('titulo')?.value;
        this._serviceFormulario.descripcion = this.cuestionarioForm.get('descripcion')?.value;
        this.router.navigate(['/dashboard/crearPreguntas'])
    }
  }
}
