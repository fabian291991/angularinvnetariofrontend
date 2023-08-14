import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Inventarioproducto } from '../../../modelos/inventarioproducto.model';
import { InventarioproductoService } from '../../../servicios/inventarioproducto.service';
import { ProductoService } from '../../../servicios/producto.service';
import { Producto } from '../../../modelos/producto.model';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;   // Indica si el componente está en modo creación o edición
  id_inventarioproducto: string = "";     // Identificador del estudiante (en caso de edición)
  intentoEnvio: boolean = false;  // Indica si se ha intentado enviar el formulario
  elInventarioproducto: Inventarioproducto = {    // Objeto que representa los datos del estudiante
    producto:"",
    inventario:""
  }
  productos:Producto[];
  constructor(private miServicioInventarioproducto: InventarioproductoService,
    private miServicioProducto: ProductoService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.listarproductos();
    if (this.rutaActiva.snapshot.params.id_inventarioproducto) {   
      this.id_inventarioproducto = this.rutaActiva.snapshot.params.id_inventarioproducto;// Obtiene el valor del parámetro "id_estudiante" de la URL y lo asigna a la variable "id_estudiante"
      this.elInventarioproducto.inventario=this.id_inventarioproducto;
  }}
  
  listarproductos():void{
    this.miServicioProducto.listar().subscribe(data=>{
      this.productos=data;
    })

  }
  
  agregar(): void {
    // Verifica si los datos están completos antes de agregar el estudiante
      console.log(this.elInventarioproducto);
      this.intentoEnvio = true;
      // Crea un nuevo estudiante utilizando el servicio de estudiantes
      this.miServicioInventarioproducto.crear(this.elInventarioproducto).
        subscribe(data => {       // Se suscribe a la respuesta del servicio
          Swal.fire(              // Muestra una notificación utilizando la librería Swal (SweetAlert)
            'Creado',
            'El inventario-producto ha sido creado correctamente',
            'success'
          )
          // Navega hacia la página de listar estudiantes utilizando el objeto "router"
          this.router.navigate(["pages/inventarioproducto/listar/"+this.id_inventarioproducto]);
        });
    //}
  }
  // Edita los datos del estudiante utilizando el servicio de estudiantes
  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {   
      this.miServicioInventarioproducto.editar(this.elInventarioproducto._id, this.elInventarioproducto).
        subscribe(data => {
          Swal.fire(
            'Actualizado',
            'El estudiante ha sido actualizado correctamente',
            'success'
          )
          this.router.navigate(["pages/estudiantes/listar"]);
        });
    }
  }
  // Valida si todos los campos obligatorios están completos
  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(
       this.elInventarioproducto.producto=="" || 
       this.elInventarioproducto.inventario==""
        ){    
      return false;
    }else{
      return true;
    }
  }
}

