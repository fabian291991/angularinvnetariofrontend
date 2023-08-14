import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Inventarioproducto } from '../../../modelos/inventarioproducto.model';
import { InventarioproductoService } from '../../../servicios/inventarioproducto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  inventarioproducto : Inventarioproducto[]; // Arreglo que almacenará la lista de almacenistas
  nombresColumnas: string[] = ['Marca','Precio','Referencia','Talla','Cantidad','Eliminar'];
  id_inventario:string;
  constructor( private rutaActiva: ActivatedRoute,private miServicioInventarioproducto: InventarioproductoService, private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_inventarioproducto) {   
      this.id_inventario = this.rutaActiva.snapshot.params.id_inventarioproducto;// Obtiene el valor del parámetro "id_estudiante" de la URL y lo asigna a la variable "id_estudiante"
      this.listar(this.id_inventario);
    }
    
  }
  listar(id:string):void{
    // Llama al servicio de almacenista para obtener la lista de almacenista
    this.miServicioInventarioproducto.getInventarioproducto(id).
      subscribe(data => {
        this.inventarioproducto=data;
        console.log(this.inventarioproducto); // Almacena la lista de los almacenistas en la variable almacenista
      });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/inventarioproducto/crear/"+this.id_inventario]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/inventarioproducto/actualizar/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar inventarioproducto',
      text: "Está seguro que quiere eliminar el inventarioproducto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioInventarioproducto.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El inventarioproducto ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();// Vuelve a cargar la lista de almacenista después de eliminar uno
          });
      }
    })
  }
}
