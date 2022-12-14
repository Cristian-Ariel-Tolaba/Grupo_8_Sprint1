import React, { useState, useEffect } from 'react'
import UseFetch from '../hooks/UseFetch';
import {Link} from 'react-router-dom';

export const LastProduct = () => {
  
  const [state, setState] = useState({
    loading : true,
    product : {}
  });
  useEffect(() => {
    UseFetch("/products/last")
      .then(({ data }) => {
        setState({
          loading : false,
          product : data
        });
      }).catch(error => console.error(error))
   
  }, []);
  return (
    <div className="col-lg-6 mb-4">
    <div className="card shadow mb-4">
      {
        state.loading

        ?
<p>cargando...</p>
:
(
  <>
  <div className="card-header py-3">
  <h5 className="m-0 font-weight-bold text-gray-800">
    {
    
      state.product.name
    }
  </h5>
</div>
<div className="card-body">
  <div className="text-center">
    {
     
      <img
      className="img-fluid px-3 px-sm-4 mt-3 mb-4"
      style={{ height: "20vh" }}
      src={state.product.images[0].fileUrl}
      alt={state.product.name}
    />
    }
   
  </div>
  <p>
  {state.product.description}
  </p>
  <Link
    className="btn btn-primary w-100"
    target="_blank"
    to="/"
  >
    Ver más
  </Link>
 
</div>
</>
)
      }
     
    </div>
  </div>
  )
}
