import { Pregunta } from "./Pregunta";

export class Cuestionario{
    id?:string;
    uid:string;
    titulo:string;
    descripcion:string;
    codigo:string;
    cantPreguntas:number;
    fechaCreacion:Date;
    listPregunta:Pregunta[]
    constructor(uid:string,titulo:string, descripcion:string, 
         codigo:string, cantPreguntas:number,  fechaCreacion:Date, listPregunta:Pregunta[] ){
            this.uid = uid;
            this.titulo = titulo;
            this.descripcion = descripcion;
            this.codigo = codigo;
            this.cantPreguntas = cantPreguntas;
            this.fechaCreacion = fechaCreacion;
            this.listPregunta = listPregunta;
    }
}