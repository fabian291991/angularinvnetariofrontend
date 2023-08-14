import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InventarioService } from '../../../servicios/inventario.service';
import { Inventario } from '../../../modelos/inventario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  inventario : Inventario[];
  nombresColumnas: string[] = ['Nombre inventario','Año','Mes','Almacenista','Opciones'];

  constructor(private miServicioInventario: InventarioService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
    
  }
  listar():void{
    this.miServicioInventario.listar().
      subscribe(data => {
        console.log(data);
        this.inventario=data
      });
  }


  verinventarioproducto(id:string):void{

this.router.navigate(["pages/inventarioproducto/listar/"+id]);

  }

  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/inventario/crear"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/inventario/actualizar/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
    title: 'Eliminar inventario',
    text: "Está seguro que quiere eliminar el inventario?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioInventario.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El inventario ha sido eliminado correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }

}
