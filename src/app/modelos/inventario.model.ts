import { Almacenista } from "./almacenista.model";

export class Inventario {
    _id?:string;
    almacenista?:Almacenista|string;
    ano:string;
   /* cantidad:string;*/
    mes:string;
    nombre_inventario:string;
}
