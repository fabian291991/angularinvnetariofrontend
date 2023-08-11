import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InventarioproductoRoutingModule } from './inventarioproducto-routing.module';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path:'lsitar',
    component:ListarComponent
  }
];

@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    InventarioproductoRoutingModule,
    NbCardModule,
    FormsModule
    
  ]
})
export class InventarioproductoModule { }
