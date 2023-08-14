import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Almacenista } from '../../../modelos/almacenista.model';
import { AlmacenistaService } from '../../../servicios/almacenista.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  almacenista : Almacenista[]; // Arreglo que almacenará la lista de almacenistas
  nombresColumnas: string[] = ['Id Almacenista','Cedula','Nombre','Apellido','Opciones'];

  constructor(private miServicioAlmacenista: AlmacenistaService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    // Llama al servicio de almacenista para obtener la lista de almacenista
    this.miServicioAlmacenista.listar().
      subscribe(data => {
        this.almacenista=data; // Almacena la lista de los almacenistas en la variable almacenista
      });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/almacenista/crear"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/almacenista/actualizar/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar almacenista',
      text: "Está seguro que quiere eliminar el almacenista?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioAlmacenista.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El estudiante ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();// Vuelve a cargar la lista de almacenista después de eliminar uno
          });
      }
    })
  }
}
