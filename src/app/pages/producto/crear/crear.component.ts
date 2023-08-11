import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../servicios/producto.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_producto: string = "";
  intentoEnvio: boolean = false;
  elProducto: Producto = {
    referencia: "",
    precio: "",
    talla: "",
    marca: ""
  }
  constructor(private miServicioProducto: ProductoService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_estudiante) {
      this.modoCreacion = false;
      this.id_producto = this.rutaActiva.snapshot.params.id_producto;
      this.getProducto(this.id_producto)
    } else {
      this.modoCreacion = true;
      }

  }
  getProducto(id: string) {
    this.miServicioProducto.getProducto(id).
    subscribe(data => {
    this.elProducto = data;
    });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioProducto.crear(this.elProducto).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'El producto ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/producto/listar"]);
        });
    }
  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {   
      this.miServicioProducto.editar(this.elProducto.__id_producto, this.elProducto).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El producto ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/producto/listar"]);
        });
    }
  }
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elProducto.referencia=="" || 
       this.elProducto.precio=="" || 
       this.elProducto.talla=="" ||
       this.elProducto.marca==""){
      return false;
    }else{
      return true;
    }
  }

}