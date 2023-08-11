import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../servicios/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  producto : Producto[];
  nombresColumnas: string[] = ['Referencia','Precio','Talla','Marca'];

  constructor(private miServicioProducto: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    this.miServicioProducto.listar().
      subscribe(data => {
        this.producto=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/producto/crear"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/producto/actualizar/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Producto',
      text: "Está seguro que quiere eliminar el Producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioProducto.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El Producto ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }

}
