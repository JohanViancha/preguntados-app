import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading:boolean;
  constructor(private fb: FormBuilder, private auth:AngularFireAuth,
    private toastr: ToastrService,private _errorService:ErrorService,
    private router:Router
    ) { 
      this.loading = false;
      this.loginForm = this.fb.group({
        usuario:['', [Validators.required, Validators.email]],
        password:['',Validators.required]

      });
  }

  ngOnInit(): void {
  }

  login(){
    const usuario = this.loginForm.controls.usuario?.value;
    const password = this.loginForm.controls.password?.value;
    this.loading = true;
    this.auth.signInWithEmailAndPassword(usuario, password).then((rta)=>{
      this.loading = false;
      if(!rta.user?.emailVerified){
        this.router.navigate(['usuario/verificarCorreo'])
      }else{
        this.setLocalStorage(rta.user);
        this.router.navigate(['/dashboard'])

      }
      
    })
    .catch((error)=>{
      this.toastr.error(this._errorService.error(error.code))
      this.loading = false;
      this.loginForm.reset();
    })
  }

  setLocalStorage(user: any){
    const usuario:User ={
      uid: user.uid,
      email:user.email
    }

    localStorage.setItem('user', JSON.stringify(usuario));
  }
}
