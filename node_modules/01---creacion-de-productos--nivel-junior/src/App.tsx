import Carrito from "./components/Carrito"
import FiltroProducto from "./components/FiltroProducto"
import FormProducto from "./components/FormProducto"
import Productos from "./components/Productos"

function App() {

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 bg-green-200 mt-20 rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-center text-6xl font-bold text-green-700 underline p-2">Vaskapi</h1>
          <Carrito />
        </div>
          <FiltroProducto />
        <div className="flex md:justify-around flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-4 sm:order-last md:order-first">
            <h2 className="text-center text-2xl font-bold text-green-500">Productos</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Productos />
            </div> 
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-2xl font-bold text-green-500">Carrito</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <FormProducto />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
