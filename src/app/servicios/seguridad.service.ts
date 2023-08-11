import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuarios } from '../modelos/usuarios.model'; 


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  elUsuario = new BehaviorSubject<Usuarios>(new Usuarios); 
   

  constructor(private http: HttpClient,private router: Router) {
    this.verificarSesionActual(); 
   }

   public get usuarioSesionActiva(): Usuarios { 
     return this.elUsuario.value;
   }

   setUsuario(user: Usuarios) { 
    this.elUsuario.next(user);
  }
  getUsuario() {
    return this.elUsuario.asObservable();
  }
  login(infoUsuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${environment.url_gateway}/login`, infoUsuario);
  }
  guardarDatosSesion(datosSesion: any) {
  let sesionActual = localStorage.getItem('sesion');
  let data: Usuarios = {
    _id: datosSesion.user_id, token:datosSesion.token,
  };
  localStorage.setItem('sesion', JSON.stringify(data));
  this.setUsuario(data);
  }
  logout() {
    localStorage.removeItem('sesion'); 
    this.setUsuario(new Usuarios());
  }
  verificarSesionActual() {
    let sesionActual = this.getDatosSesion(); 
    if (sesionActual) {
    this.setUsuario(JSON.parse(sesionActual));
    }

  }  
  sesionExiste(): boolean {
    let sesionActual = this.getDatosSesion(); 
    return (sesionActual) ? true : false;
    }
  getDatosSesion() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
   
  }

}
