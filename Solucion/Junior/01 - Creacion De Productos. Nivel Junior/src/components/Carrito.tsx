import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useCarritoStore } from "../store/carrito";
import { MdDelete } from "react-icons/md";

export default function Carrito() {
    const [isOpen, setIsOpen] = useState(false);
    const { carrito, deleteCarrito } = useCarritoStore((state) => state)

    const handleClose = () => setIsOpen(false);
    return (
        <>
            <div className="">
                <button className="bg-transparent" onClick={() => setIsOpen(true)}><span className="text-4xl text-green-700"><IoMenu/></span></button>
            </div>

            <Drawer open={isOpen} onClose={handleClose} position="right">
                <DrawerHeader title="Drawer" />
                <DrawerItems >
                  <h2 className="text-center text-xl my-5 text-green-300">¡Tu carrito de la compra!</h2>
                  <div className="flex flex-col justify-center gap-4">
                    {carrito.length > 0 ? (
                        carrito.map((prd) => (
                            <div key={prd.id} className="flex justify-between items-center">
                                <p className="text-green-500">{prd.nombre}</p>
                                <p className="text-white">{+prd.cantidadProducto}</p>
                                <button onClick={() => deleteCarrito(prd.id)} className="bg-white rounded-full"><MdDelete/></button>
                            </div>
                        ))
                    ) :
                        <p className="text-center text-xl my-5 text-green-300">
                            No hay productos en el carrito
                        </p>
                    }
                  </div>
                </DrawerItems>
            </Drawer>
        </>
    )
}
