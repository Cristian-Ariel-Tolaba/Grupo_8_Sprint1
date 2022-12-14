import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import UseFetch from "../../hooks/UseFetch";

export const ProductAdd = ({ handlerAdd }) => {

  const inputFile = useRef();
  const formulario = useRef();
  const btnSubmit = useRef();
  const imgPrev = useRef();
  const btnUpload = useRef();
  
  const [categories, setCategories] = useState({
    loading : true,
    data : []
  });

  useEffect(() => {
   UseFetch('/categories')
   .then(({data})=> {
    setCategories({
      loading : false,
      data
    })
   })
  }, []);

  const reset = () => {
    imgPrev.current.src = "";
    const elements = formulario.current.elements;
    btnSubmit.current.disabled = true
    
    for (let i = 0; i < elements.length - 1; i++) {
      elements[i].value = "";
    }

    btnUpload.current.innerHTML = "Cargar imagen *";

  }

  const handlerInputChange = () => {
    const elements = formulario.current.elements
    let error = false;
    
    for (let i = 0; i < elements.length - 2; i++) {
      if(!elements[i].value.trim()){
        error = true;
        btnSubmit.current.disabled = true
      }
    }
    
    if(!error){
     
      btnSubmit.current.disabled = false
    }

  }

  const handlerImagePrev = ({target}) => {
    let reader = new FileReader();
    reader.readAsDataURL(target.files[0])
    reader.onload = () => {
        imgPrev.current.src = reader.result;
        btnSubmit.current.disabled = false;
        btnUpload.current.innerHTML = "Cambiar imagen";
        handlerInputChange()
    }
}
 
  const handlerSubmit = (e) => {
    e.preventDefault();
        handlerAdd(e.target);
      inputFile.current.value = "";
      reset()
    
  };

  return (
    <>
      <h4>Agregar Producto </h4>
      <hr />
      <form onSubmit={handlerSubmit} className="row" ref={formulario}>
        <div className="col-12 mb-3">
          <label htmlFor="name" className="form-label">
            Nombre *
          </label>
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            onChange={handlerInputChange}
            />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="category" className="form-label">
            Categoría *
          </label>
          <select 
            className="form-control" 
            name="category"
            onChange={handlerInputChange}
             
            >
           <option hidden defaultValue value="">Seleccione...</option>
              {
                categories.data.map((category, index) => (
                  <option value={category.id} key={index}>{category.name}</option>
                ))
              }
            </select>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input 
          type="number" 
          className="form-control" 
          name="price" 
          onChange={handlerInputChange}
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="discount" className="form-label">
            Descuento
          </label>
          <input 
          type="number" 
          className="form-control" 
          name="discount" 
          onChange={handlerInputChange}
          value = {0}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="description" className="form-label">
            Descripción *
          </label>
          <textarea
            className="form-control"
            name="description"
            style={{ resize: "none" }}
            onChange={handlerInputChange}
          ></textarea>
        </div>
        <div className="col-12 mb-3 row">
                    <div className="col-6 d-flex justify-content-center">
                    <img className="img-fluid" src="" alt="" ref={imgPrev}/>

                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                    <input
                        className="form-control"
                        type="file"
                        name="image"
                        id="image"
                        ref={inputFile}
                        hidden
                        onChange={handlerImagePrev}
                    />
                    <label className="btn btn-primary my-1" htmlFor="image" ref={btnUpload}>
                        Cargar imagen *
                    </label>
                    <button className="btn btn-secondary my-1 " type="reset" onClick={reset}>
                        Limpiar
                    </button>
                    <button className="btn btn-success my-1" type="submit" disabled ref={btnSubmit}>
                        Guardar
                    </button>
                    
                    </div>

                </div>
                <div className="col-12">

                </div>

      </form>
    </>
  );
};
