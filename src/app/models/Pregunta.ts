import { Respuesta } from "./Respuesta";

export class Pregunta{

    titulo:string;
    puntos:number;
    segundos:number;
    listRespuesta:Respuesta[];

    constructor( titulo:string, puntos:number, segundos:number, listRespuesta:Respuesta[]){
        this.titulo = titulo;
        this.puntos = puntos;
        this.segundos = segundos;
        this.listRespuesta = listRespuesta;
    }
}