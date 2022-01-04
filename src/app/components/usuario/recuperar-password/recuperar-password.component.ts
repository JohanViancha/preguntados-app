import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarForm:FormGroup;
  loading:boolean;
  constructor(private fb:FormBuilder,
              private router:Router, 
              private afAuth:AngularFireAuth,
              private toastr: ToastrService,
              private _errorService:ErrorService) {
      this.loading = false;
      this.recuperarForm = this.fb.group({
        usuario:['', [Validators.required, Validators.email]]
      })           
    }

  ngOnInit(): void {
  }

  recuperarPassword(){
    const correo = this.recuperarForm.controls.usuario?.value;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(correo).then(()=>{
        this.toastr.info('Enviamos un correo para reestablecer su contraseña','Reestablecer contraseña');
        this.router.navigate(['/usuario']);
    })
    .catch((error)=>{
      this.loading = false;
        this.toastr.error(this._errorService.error(error.code),'Error');
        this.recuperarForm.reset();
    });
  }

}
