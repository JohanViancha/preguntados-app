import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  tituloCuestionario:string;
  descripcion:string;

  constructor() {
    this.tituloCuestionario = '';
    this.descripcion = '';
   }


}
