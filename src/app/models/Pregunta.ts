import { Respuesta } from "./Respuesta";

export class Pregunta{


    constructor(private titulo:string,private puntos:number,private segundos:number,private listRespuesta:Respuesta[]){
        this.titulo = titulo;
        this.puntos = puntos;
        this.segundos = segundos;
        this.listRespuesta = listRespuesta;
    }
}