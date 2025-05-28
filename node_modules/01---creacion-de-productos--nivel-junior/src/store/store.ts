import { create } from "zustand";
import { v4 as uuidv4 } from "uuid"
import { persist } from "zustand/middleware";
import type { iProducto, tProducto } from "../types/productos";

interface ProductoState {
    productos : iProducto[],
    tipoFiltro : string,
    busqueda : string,
    IdActivo : iProducto['id'],
    setTipoFiltro: (tipo: string) => void;
    setBusqueda: (valor: string) => void;
    getProductosFiltrados: () => iProducto[];
    addProducto : (producto : tProducto) => void,
    deleteProducto : (id : iProducto['id']) => void,
    getProductById : (id : iProducto['id']) => void, 
    updateProduct : (id : tProducto) => void
}

const crearProducto = (producto : tProducto) : iProducto => {
    return { ...producto, fechaCreacion : new Date(), id : uuidv4()}
}

export const useProductosStore = create<ProductoState>()(
    persist((set, get) => ({
        productos: [],
        tipoFiltro : 'nombre',  // Filtra por defecto
        busqueda : '',  // Texto a buscar
        IdActivo : '',
        setTipoFiltro: (tipo) => set({ tipoFiltro: tipo }), //  Cambia el tipo de filtro
        setBusqueda: (valor) => set({ busqueda: valor }), // Cambia el valor de la busqueda
        getProductosFiltrados: () => {  // Función para obtener productos filtrados
            const { productos, tipoFiltro, busqueda } = get();  // Extrae el ESTADO ACTUAL
            return productos.filter((prd) => {  // Filtra productos según el filtro activo
                const valor = prd[tipoFiltro as keyof iProducto];   // Obtiene el valor del campo 
            
                if (tipoFiltro === 'fechaCreacion') {
                    if (!(valor instanceof Date)) return false;
                     // Convierte la fecha a string formato 'YYYY-MM-DD' (igual al input type="date")
                    const fechaFormateada = valor.toISOString().split("T")[0];
                    return fechaFormateada === busqueda;    // Compara con el valor buscado (fecha exacta)
                }
                
                // Para el resto de los tipos de filtro
                return valor?.toString().toLowerCase().includes(busqueda.toLowerCase());
            });
        },
        addProducto : (producto) => {
            const nuevoProducto = crearProducto(producto);
            set((state) => ({
                productos : [...state.productos, nuevoProducto]
            }))
        },
        deleteProducto : (id) => {
            set((state) => ({
                productos : state.productos.filter((prd) => prd.id !== id)
            }))
        },
        getProductById : (id) => {
            set(() => ({   
                IdActivo : id 
            }))
        },
        updateProduct: (data) => {
            set((state) => ({
                productos: state.productos.map((producto) =>
                    producto.id === state.IdActivo ? { ...producto, ...data } : producto
                ),
                IdActivo: ''
            }));
        }
    }),{
      name: 'productos-storage'
    })
)