import React from 'react'
import { ProductRow } from './ProductRow'

export const ProductTable = ({ products, handlerEdit, handlerDelete }) => {

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h4>Lista de productos</h4>
      
      </div>
      <hr />
      <div className='table-responsive'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Descuento</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products && products.map((product, index) => (
                <ProductRow
                  key={product.name + index}
                  {...product}
                  handlerEdit={handlerEdit}
                  handlerDelete={handlerDelete}
                />
              ))
            }

          </tbody>
        </table>


      </div>
    </>
  )
}
