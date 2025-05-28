import { useForm } from 'react-hook-form';
import type { tProducto } from '../types/productos';
import ProductoError from './ProductoError';
import { useProductosStore } from '../store/store';
import { useEffect } from 'react';

export default function FormProducto() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<tProducto>();
    const { productos, IdActivo, addProducto, updateProduct } = useProductosStore((state) => state); 

    useEffect(() => {   // useEffect para comprobar cuando el activeID cambia y así poder rellenar el formulario con los datos del paciente
        if(IdActivo) {
            const productoSelect = productos.filter((prd) => prd.id === IdActivo)[0]; // Nos traemos el paciente cuyo ID coincida con el activeID
            // Rellenamos el formulario con setValue
            setValue('nombre', productoSelect.nombre) // Seteamos el nombre del paciente
            setValue('cantidad', productoSelect.cantidad) // Seteamos el propietario del paciente
            setValue('precio', productoSelect.precio) // Seteamos el email del paciente
        }
    }, [IdActivo])

    const registrarProducto = (data : tProducto) => {
        if(IdActivo){
            updateProduct(data);
        } else {
            addProducto(data);
        }
        reset();
    }

    return (
        <div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(registrarProducto)}>
                <div className='flex flex-col mb-5'>
                    <label htmlFor='nombre'>Nombre del Producto:</label>
                    <input id='nombre' type='text' placeholder='Nombre del producto' className='border-2 rounded-lg p-2'
                    {...register('nombre', { required : 'El nombre del producto es obligatorio'})}/>
                    {errors.nombre && (
                        <ProductoError>{errors.nombre.message}</ProductoError>
                    )}
                </div>
                <div className='flex flex-col mb-5'>
                    <label htmlFor='precio'>Precio del Producto:</label>
                    <input id='precio' type='number' placeholder='Precio del producto' className='border-2 rounded-lg p-2'
                    {...register('precio', { required : 'El precio del producto es obligatorio'})}/>
                    {errors.nombre && (
                        <ProductoError>{errors.precio?.message}</ProductoError>
                    )}
                </div>
                <div className='flex flex-col mb-5'>
                    <label htmlFor='cantidad'>Stock del Producto:</label>
                    <input id='cantidad' type='number' placeholder='Stock del producto' className='border-2 rounded-lg p-2'
                    {...register('cantidad', { required : 'El stock del producto es obligatorio'})}/>
                    {errors.nombre && (
                        <ProductoError>{errors.cantidad?.message}</ProductoError>
                    )}
                </div>
                <input className='p-2 bg-green-300 hover:bg-green-400 text-white cursor-pointer font-bold'
                    type='submit' value={'Guardar Producto'}
                />
            </form>
        </div>
    )
}
