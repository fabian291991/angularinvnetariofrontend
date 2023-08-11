import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Inventarioproducto } from '../../../modelos/inventarioproducto.model';
import { InventarioproductoService } from '../../../servicios/inventarioproducto.service';

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
    _id: "",
    fecha: "",
    producto: "",
    almacenista: "",
    cantidad: ""
  }

  constructor(private miServicioInventarioproducto: InventarioproductoService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Si se recibe un parámetro "id_estudiante" en la URL, se está en modo edición
    if (this.rutaActiva.snapshot.params.id_inventarioproducto) {   
      this.modoCreacion = false;
      this.id_inventarioproducto = this.rutaActiva.snapshot.params.id_inventarioproducto;// Obtiene el valor del parámetro "id_estudiante" de la URL y lo asigna a la variable "id_estudiante"
      this.getInventarioproducto(this.id_inventarioproducto)
    } else {
      this.modoCreacion = true; // Si no hay valor para "id_estudiante", establece el modo de creación a verdadero, indica que se encuentra en modo de creación
    }
  }
  // Obtiene los datos del estudiante utilizando el servicio de estudiantes
  getInventarioproducto(id: string) {
    this.miServicioInventarioproducto.getInventarioproducto(id).
      subscribe(data => {
        this.elInventarioproducto = data;
      });
  }
  
  agregar(): void {
    // Verifica si los datos están completos antes de agregar el estudiante
    if (this.validarDatosCompletos()) {
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
          this.router.navigate(["pages/inventarioproducto/listar"]);
        });
    }
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
    if(this.elInventarioproducto._id=="" ||
       this.elInventarioproducto.fecha=="" || 
       this.elInventarioproducto.producto=="" || 
       this.elInventarioproducto.almacenista==""||
       this.elInventarioproducto.cantidad=="" ){    
      return false;
    }else{
      return true;
    }
  }
}

