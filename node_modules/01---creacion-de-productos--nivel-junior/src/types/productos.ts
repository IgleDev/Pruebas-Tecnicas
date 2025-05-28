export interface iProducto {
    id : string,
    nombre : string,
    precio : number,
    cantidad : number,
    fechaCreacion : Date
}

export type tProducto = Omit<iProducto, 'id'>

export type tCarritoProducto = iProducto & { cantidadProducto: number };
