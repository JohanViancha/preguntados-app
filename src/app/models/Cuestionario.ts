import { Pregunta } from "./Pregunta";

export class Cuestionario{

    constructor(private uid:string, private titulo:string, private descripcion:string, 
        private codigo:string,private cantPreguntas:number, private fechaCreacion:Date, private listPregunta:Pregunta[] ){
            this.uid = uid;
            this.titulo = titulo;
            this.descripcion = descripcion;
            this.codigo = codigo;
            this.cantPreguntas = cantPreguntas;
            this.fechaCreacion = fechaCreacion;
            this.listPregunta = listPregunta;
    }
}