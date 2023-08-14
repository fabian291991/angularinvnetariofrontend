import { Inventario } from "./inventario.model";
import { Producto } from "./producto.model";

export class Inventarioproducto {
    _id?:string;
    inventario?:string|Inventario;
    producto?:string|Producto;

}
