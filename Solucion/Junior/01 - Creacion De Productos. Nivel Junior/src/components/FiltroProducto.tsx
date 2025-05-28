import { useProductosStore } from "../store/store"

export default function FiltroProducto() {
    const { tipoFiltro, busqueda, setTipoFiltro, setBusqueda } = useProductosStore((state) => state);
  return (
    <div className="flex justify-center gap-4 my-10">
        <div className="flex flex-col justify-center mb-5">
            <label htmlFor="filtro" className="text-center text-xl font-bold text-green-500">Filtrar Productos</label>
            <select className="border-2 rounded-lg p-2" id="filtro" value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
              <option value={'nombre'}>Nombre</option>
              <option value={'precio'}>Precio</option>
              <option value={'cantidad'}>Cantidad</option>
              <option value={'fechaCreacion'}>Fecha</option>
            </select>
        </div>
        <div className="self-center">
          {tipoFiltro === 'fechaCreacion' ? (
            <input type="date" placeholder="Buscar producto" className="border-2 rounded-lg p-2"
                value={busqueda} onChange={(e) => {setBusqueda(e.target.value)}} /> // Guardamos el nuevo tipo en el store
            ) : (
              <input type="text" placeholder="Buscar producto" className="border-2 rounded-lg p-2"
                value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />   // Guardamos el nuevo tipo en el store
            )}
        </div>
    </div>
  )
}
