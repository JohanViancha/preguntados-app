import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm:FormGroup;
  loading:boolean;

  constructor(private fb:FormBuilder,private router:Router, private afAuth:AngularFireAuth,private toastr: ToastrService
    ,private _errorService:ErrorService) { 
    this.loading = false;
    this.registerForm = this.fb.group({
      usuario:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      repetirPassword:['',[Validators.required]]
    },{ validator:this.checkPassword});
  }

  ngOnInit(): void {
  }

  register(){
    const usuario = this.registerForm.controls.usuario?.value;
    const password = this.registerForm.controls.password?.value;
    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(usuario,password).then((rta)=>{
      rta.user?.sendEmailVerification();
      this.toastr.success('Hemos enviado un correo electronico para verificar tu cuenta', 'Usuario registrado!');
      this.router.navigate(['/usuario']);
    }).catch((error)=>{
      this.registerForm.reset();
      this.loading = false;
      this.toastr.error(this._errorService.error(error.code), 'Error');
    });
  }

  checkPassword(group:FormGroup):any{
    const pass = group.controls.password?.value;
    const confirmPassword = group.controls.repetirPassword?.value;
    return pass === confirmPassword ? null: {notSame:true};
    
  } 

}
