import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import { Almacenista } from '../modelos/almacenista.model'; 
import { Usuarios } from '../modelos/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class AlmacenistaService {

  constructor(private http: HttpClient) { }
  listar(): Observable<Almacenista[]> {
    return this.http.get<Almacenista[]>(`${environment.url_gateway}/almacenistas`);

  }
  eliminar(id:string){ 
    return this.http.delete<Almacenista>(`${environment.url_gateway}/almacenistas/${id}`,);

  }
  getAlmacenista(id: string): Observable<Almacenista> { 
    return this.http.get<Almacenista>(`${environment.url_gateway}/almacenistas/${id}`);
    }
    crear(elAlmacenista: Almacenista) {
    return this.http.post(`${environment.url_gateway}/almacenistas`, elAlmacenista);
    }
    editar(id:string,elAlmacenista: Almacenista) {
    return this.http.put(`${environment.url_gateway}/almacenistas/${id}`, elAlmacenista);
    }

}
