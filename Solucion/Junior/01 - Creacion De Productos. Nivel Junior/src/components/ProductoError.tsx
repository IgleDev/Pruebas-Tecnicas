import type React from "react"

interface iProductoErrorProps {
    children : React.ReactNode
}

export default function ProductoError({ children } : iProductoErrorProps) {
  return (
    <div className="text-left text-red-500">
      {children}
    </div>
  )
}
