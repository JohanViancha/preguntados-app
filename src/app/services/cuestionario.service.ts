import { refsToArray } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Cuestionario } from '../models/Cuestionario';
import { Pregunta } from '../models/Pregunta';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  tituloCuestionario:string;
  descripcion:string;
  private pregunta$ = new Subject<Pregunta>();

  constructor(private _firestore:AngularFirestore) {
    this.tituloCuestionario = '';
    this.descripcion = '';
   }

   agregarPregunta(pregunta:Pregunta){
     this.pregunta$.next(pregunta);
   }

   getPreguntas():Observable<Pregunta>{
     return this.pregunta$.asObservable();
   }

   crearCuestionario(cuestionario:Cuestionario):Promise<any>{
     return this._firestore.collection('cuestionarios').add(cuestionario);
   }


   getCuestionarioByIdUser(uid:string):Observable<any>{
     return this._firestore.collection('cuestionarios', ref=> ref.where('uid','==',uid)).snapshotChanges();
   }

   eliminarCuestionario(idCuestionario:string):Promise<any>{
     return this._firestore.collection('cuestionarios').doc(idCuestionario).delete();
   }

   getCuestionario(id:string):Observable<any>{
     return this._firestore.collection('cuestionarios').doc(id).get();
   }
}
