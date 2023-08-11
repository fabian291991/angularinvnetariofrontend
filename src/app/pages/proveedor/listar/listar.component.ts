import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../modelos/proveedor.model';
import { ProveedorService } from '../../../servicios/proveedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  proveedor : Proveedor[];
  nombresColumnas: string[] = ['Nombre','Nit','Correo','Telefono'];

  constructor(private miServicioProveedor: ProveedorService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  listar():void{
    this.miServicioProveedor.listar().
      subscribe(data => {
        this.proveedor=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/proveedor/crear"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/proveedor/actualizar/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Proveedor',
      text: "Está seguro que quiere eliminar el Proveedor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioProveedor.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El Proveedor ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }

}
