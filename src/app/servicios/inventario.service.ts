import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Inventario } from '../modelos/inventario.model';
import { Usuarios } from '../modelos/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }
  listar(): Observable<Inventario[]> {
      return this.http.get<Inventario[]>(`${environment.url_gateway}/inventarios`);
  }
  eliminar(id:string){
      return this.http.delete<Inventario>(`${environment.url_gateway}/inventarios/${id}`,
    );
  }
  getInventario(id: string): Observable<Inventario> {
    return this.http.get<Inventario>(`${environment.url_gateway}/inventarios/${id}`);
  }
  crear(elInventario: Inventario) {
    return this.http.post(`${environment.url_gateway}/inventarios`,
    elInventario);
  }
  editar(id:string,elInventario: Inventario) {
    return this.http.put(`${environment.url_gateway}/inventarios/${id}`,
    elInventario);
  }
  
}