export class Respuesta{

    constructor(private descripcion:string, private esCorrecta:boolean){
        this.descripcion = descripcion;
        this.esCorrecta = esCorrecta;
    }
}