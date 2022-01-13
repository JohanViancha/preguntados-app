import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit,OnDestroy {

  loading:boolean;
  subscriptionUser:Subscription = new Subscription();
  subscriptionUQuiz:Subscription = new Subscription();
  listCuestionario: Cuestionario[];
  constructor(private afAuth:AngularFireAuth, private router:Router, private _cuestionarioService:CuestionarioService, private toastr: ToastrService) {
    this.listCuestionario = [];
    this.loading = false;
   }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptionUser = this.afAuth.user.subscribe(user=>{
      if(user && user.emailVerified){
        this.getCuestionarios(user.uid);
      }else{
        this.router.navigate(['/'])
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
    this.subscriptionUQuiz.unsubscribe();
  }


  getCuestionarios(uid:string){
 
   this.subscriptionUQuiz = this._cuestionarioService.getCuestionarioByIdUser(uid).subscribe(data=>{
      this.listCuestionario = [];
      this.loading = false;
       data.forEach((element:any) => {
        this.listCuestionario.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
       });

       console.log(data);
    },error=>{
      this.toastr.error('Opp... ocurrio un error','Error');
      this.loading = false;
    });
  }

  eliminarCuestionario(id:string){
    this.loading = true;
    this._cuestionarioService.eliminarCuestionario(id).then(data=>{
      this.loading = false;
      this.toastr.error('El cuestionario fue eliminado con exito','Registro eliminado');
    })
    .catch(error=>{
      this.loading = false;
      this.toastr.error('Opp... ocurrio un error','Error');
    });
  }

}
