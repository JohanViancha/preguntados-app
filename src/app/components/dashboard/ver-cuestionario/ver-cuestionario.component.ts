import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styleUrls: ['./ver-cuestionario.component.css']
})
export class VerCuestionarioComponent implements OnInit {

  id:string;
  loading:boolean = false;
  cuestionario:Cuestionario | undefined;
  constructor(private _serviceCuestionario:CuestionarioService, private aRoute:ActivatedRoute) {
    this.id = aRoute.snapshot.paramMap.get('id') || '';
   }

  ngOnInit(): void {
    this.obtenerCuestionario();
  }


  obtenerCuestionario(){
    this.loading = true;
    console.log(this.id);
    this._serviceCuestionario.getCuestionario(this.id).subscribe(doc=>{
      this.cuestionario = doc.data();
      this.loading = false;
    }, error=>{
      this.loading = false;
      console.log(error);
    })
  }

}
