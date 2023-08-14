import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Proveedor } from '../../../modelos/proveedor.model';
import { ProveedorService } from '../../../servicios/proveedor.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_proveedor: string = "";
  intentoEnvio: boolean = false;
  elProveedor: Proveedor = {
    nombre: "",
    nit_proveedor: "",
    correo: "",
    telefono: "",
  }

constructor(private miServicioProveedor: ProveedorService,
  private rutaActiva: ActivatedRoute,
  private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_proveedor) {
      this.modoCreacion = false;
      this.id_proveedor = this.rutaActiva.snapshot.params.id_proveedor;
      this.getProveedor(this.id_proveedor)
    } else {
      this.modoCreacion = true;
      }

  }
  getProveedor(id: string) {
    this.miServicioProveedor.getProveedor(id).
    subscribe(data => {
    this.elProveedor = data;
    });
  }
  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioProveedor.crear(this.elProveedor).
        subscribe(data => {
          Swal.fire(
            'Creado',
            'El proveedor ha sido creado correctamente',
            'success'
          )
          this.router.navigate(["pages/proveedor/listar"]);
        });
    }
  }
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {   
      
      this.miServicioProveedor.editar(this.id_proveedor, this.elProveedor).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El proveedor ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/proveedor/listar"]);
        });
    }
  }
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elProveedor.nombre=="" || 
       this.elProveedor.nit_proveedor=="" || 
       this.elProveedor.correo=="" ||
       this.elProveedor.telefono==""){
      return false;
    }else{
      return true;
    }
  }
}
