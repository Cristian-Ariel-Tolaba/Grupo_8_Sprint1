import React, { useEffect, useState } from 'react'
import { ProductAdd } from '../components/products/ProductAdd';
import { ProductEdit } from '../components/products/ProductEdit';
import { ProductTable } from '../components/products/ProductTable';
import UseFetch from '../hooks/UseFetch';

const Products = () => {

  const [state, setState] = useState({
    loading : true,
    products : [],
  });

  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    UseFetch('/products')
      .then(({data})=> {
        setState({
          loading : false,
          products : data
        })
      })
  }, []);

  const handlerAdd = async (form) =>{
      let formData = new FormData(form)
   
      UseFetch('/products', 'POST', formData)
      .then(response => {
        if(response.ok){
          setState({
            loading : false,
            products : [...state.products, response.data]
          })
        }
       
      })
      .catch(error => console.error(error))

  }

  const handlerEdit = (id) => {
      setEditProduct(id && id)
  }

  const handlerUpdate = (form,id) => {
    let formData = new FormData(form)
   
      UseFetch(`/products/${id}`, 'PATCH', formData)
      .then(response => {
        if(response.ok){

          const productsUpdated = state.products.map(product => {
            if(product.id === response.data.id){
              return response.data
            }
            return product
          })
          
          setState({
            loading : false,
            products : productsUpdated
          })
        }
       
      })
      .catch(error => console.error(error))
  } 

  const handlerDelete = (id) => {
    UseFetch(`/products/${id}`, 'DELETE')
    .then(response => {
      console.log(response);

      if(response.ok){
        const productsUpdated = state.products.filter(product => product.id !== +response.data.id)
        
        setState({
          loading : false,
          products : productsUpdated
        })
      }
     
    })
    .catch(error => console.error(error))
  }


  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">
          <div className="col-12 col-md-7">
              <ProductTable
                products = {state.products}
                handlerEdit = {handlerEdit}
                handlerDelete = {handlerDelete}
                />
            </div>
            <div className="col-12 col-md-5">
              {
                editProduct
                ?
                <ProductEdit
                handlerEdit={handlerEdit}
                handlerUpdate={handlerUpdate}
                id = {editProduct}
                />
                :
                <ProductAdd 
                handlerAdd = {handlerAdd}
              />
              }
           
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products