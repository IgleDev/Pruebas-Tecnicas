import { create } from "zustand";
import type { iProducto, tCarritoProducto } from "../types/productos";
import { persist } from "zustand/middleware";

interface iCarritoState {
    carrito : tCarritoProducto[];
    addCarrito : (prd : iProducto) => void;
    deleteCarrito : (id : iProducto['id']) => void;
}


const crearProducto = (carrito: tCarritoProducto[], prd: iProducto): tCarritoProducto[] => {
    const productoExistente = carrito.find((item) => item.id === prd.id);
    if (productoExistente) {
        return carrito.map(item =>
            item.id === prd.id
                ? { ...item, cantidadProducto: item.cantidadProducto + 1 }
                : item
        );
    }

    return [...carrito, { ...prd, cantidadProducto: 1 }];
};



export const useCarritoStore = create<iCarritoState>()(
    persist((set, get) => ({
        carrito: [],
        addCarrito: (prd) => {
            const carritoActual = get().carrito;
            const carritoActualizado = crearProducto(carritoActual, prd);
            set({ carrito: carritoActualizado });
        },
        deleteCarrito : (id : iProducto['id']) => {
            set((state) => ({
                carrito : state.carrito.filter((prd) => prd.id !== id)
            }))
        }
    }), {
        name: 'carrito'
    })
);