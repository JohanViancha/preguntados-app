import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code:string):string{
    switch(code){
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado';
      case 'auth/weak-password':
        return 'La contraseña debe tener más de 6 caracteres';
      case 'auth/invalid-email':
        return 'El corre es invalido';
      case 'auth/user-not-found':
        return 'Usuario incorrecto';
      case 'auth/wrong-password':
        return 'La contraseña es invalida';
      default:
        return 'Error desconocido'
    }
  }
}
