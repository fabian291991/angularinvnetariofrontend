import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { ListarComponent } from './listar/listar.component';
import { Path } from 'leaflet';

const routes: Routes = [
  {
    path:'listar',
    component: ListarComponent
  },
  {  
    path:'crear',
    component: CrearComponent
  },
  {  
    path:'actualizar/:id_producto',
    component: CrearComponent
  }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
