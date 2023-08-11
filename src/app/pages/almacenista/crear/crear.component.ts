import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Almacenista } from '../../../modelos/almacenista.model';
import { AlmacenistaService } from '../../../servicios/almacenista.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;   // Indica si el componente está en modo creación o edición
  id_almacenista: string = "";     // Identificador del almacenista (en caso de edición)
  intentoEnvio: boolean = false;  // Indica si se ha intentado enviar el formulario
  elAlmacenista: Almacenista = {    // Objeto que representa los datos del almacenista
    cedula: "",
    nombre: "",
    apellido: ""

  }

  constructor(private miServicioAlmacenista: AlmacenistaService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_almacenista) {   
      this.modoCreacion = false;
      this.id_almacenista = this.rutaActiva.snapshot.params.id_almacenista;// Obtiene el valor del parámetro "id_estudiante" de la URL y lo asigna a la variable "id_estudiante"
      this.getAlmacenista(this.id_almacenista)
    } else {
      this.modoCreacion = true; // Si no hay valor para "id_almacenista", establece el modo de creación a verdadero, indica que se encuentra en modo de creación
    }
  }
  // Obtiene los datos del almacenista utilizando el servicio de almacenista
  getAlmacenista(id: string) {
    this.miServicioAlmacenista.getAlmacenista(id).
      subscribe(data => {
        this.elAlmacenista = data;
      });

  }
  
    agregar(): void {
      // Verifica si los datos están completos antes de agregar el almacenista
      if (this.validarDatosCompletos()) {
        this.intentoEnvio = true;
        // Crea un nuevo almacenista utilizando el servicio de almacenista
        this.miServicioAlmacenista.crear(this.elAlmacenista).
          subscribe(data => {       // Se suscribe a la respuesta del servicio
            Swal.fire(              // Muestra una notificación utilizando la librería Swal (SweetAlert)
              'Creado',
              'El almacenista ha sido creado correctamente',
              'success'
            )
            // Navega hacia la página de listar estudiantes utilizando el objeto "router"
            this.router.navigate(["pages/almacenista/listar"]);
          });

      }

    }
    editar(): void {
      this.intentoEnvio = true;
      if (this.validarDatosCompletos()) {   
        this.miServicioAlmacenista.editar(this.elAlmacenista._id, this.elAlmacenista).
          subscribe(data => {
            Swal.fire(
              'Actualizado',
              'El almacenista ha sido actualizado correctamente',
              'success'
            )
            this.router.navigate(["pages/almacenista/listar"]);
          });
      }
    }
    // Valida si todos los campos obligatorios están completos
    validarDatosCompletos():boolean{
      this.intentoEnvio=true;
      if(this.elAlmacenista.cedula=="" || 
         this.elAlmacenista.nombre=="" || 
         this.elAlmacenista.apellido==""){
        return false;
      }else{
        return true;
      }
    }

}
