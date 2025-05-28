import { useCarritoStore } from "../store/carrito";
import { useProductosStore } from "../store/store"
import { IoAddOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

export default function Productos() {
    const { productos, tipoFiltro, busqueda, deleteProducto, getProductById } = useProductosStore((state) => state); 
    const { addCarrito } = useCarritoStore((state) => state);
    const productosFiltrados = productos.filter((producto) => {
        const valor = producto[tipoFiltro as keyof typeof producto];
        return valor?.toString().toLowerCase().includes(busqueda.toLowerCase());
    });

    return (
        <div>
            {productosFiltrados.length ?    // Filtrado manual de los productos
                (
                    <ul className="flex flex-wrap gap-4 justify-center">
                        {productosFiltrados.map((producto) => (
                            <li key={producto.id} className="bg-white shadow-md rounded-lg p-4">
                                <h3 className="text-xl font-bold">{producto.nombre}</h3>
                                <p>Precio: ${producto.precio}</p>
                                <p>Cantidad: {producto.cantidad}</p>
                                <p>Fecha de Creación: {new Date(producto.fechaCreacion).toLocaleDateString()}</p>
                                <button onClick={() => addCarrito(producto)} className="bg-green-500 text-2xl text-white p-2 rounded-full mt-5"><IoAddOutline/></button>
                                <button onClick={() => getProductById(producto.id)} className="bg-yellow-500 text-2xl mx-5 text-white p-2 rounded-full mt-5"><FaPencilAlt/></button>
                                <button onClick={() => deleteProducto(producto.id)} className="bg-red-500 text-white text-2xl p-2 rounded-full mt-5"><MdDelete/></button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No hay productos disponibles</p>
                )
            }
        </div>
    )
}
