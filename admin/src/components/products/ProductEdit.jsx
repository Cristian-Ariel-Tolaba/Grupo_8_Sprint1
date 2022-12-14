import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import UseFetch from "../../hooks/UseFetch";

export const ProductEdit = ({ handlerEdit, handlerUpdate, id }) => {
    const inputFile = useRef();
    const imgPrev = useRef();

    const [categories, setCategories] = useState({
        loading : true,
        data : []
    });

    const [state, setState] = useState({
        loading : true,
        product : {}
    });

    useEffect(() => {
        UseFetch('/categories')
            .then(({ data }) => {
                setCategories({
                    loading: false,
                    data
                })
            }).catch(error => console.log(error))
    }, []);

    useEffect(() => {
        UseFetch(`/products/${id}`)
        .then(response => {
          if(response.ok){
            setState(response.data)
          }
        })
        .catch(error => console.error(error))
    }, [id]);

    const handlerImagePrev = ({target}) => {
        let reader = new FileReader();
        reader.readAsDataURL(target.files[0])
        reader.onload = () => {
            imgPrev.current.src = reader.result
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        handlerUpdate(e.target, id);
        inputFile.current.value = "";
    };
    return (
        <>
            <h3>Editando producto</h3>
            <hr />
            {
                
                <form onSubmit={handlerSubmit} className="row">
           
                <div className="col-12 mb-3">
                    <label htmlFor="name" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        defaultValue={state.name}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="category" className="form-label">
                        Categoría
                    </label>
                    <select
                        className="form-control"
                        name="category"
                    >
                        {
                            categories.data.map((category, index) => (

                                <option
                                    defaultValue={category.id}
                                    selected={state.categoryId === category.id}
                                    key={index}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">
                        Precio
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        defaultValue={state.price}
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
                        defaultValue={state.discount}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">
                        Descripción
                    </label>
                    <textarea
                        className="form-control"
                        name="description"
                        style={{ resize: "none" }}
                        defaultValue={state.description}
                    ></textarea>
                </div>
                <div className="col-12 mb-3 row">
                    <div className="col-6 d-flex justify-content-center">
                    <img className="img-fluid" src={state.images && state.images[0].fileUrl} alt="" ref={imgPrev}/>

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
                    <label className="btn btn-primary my-1" htmlFor="image">
                        Cambiar imagen
                    </label>
                    <button onClick={() => handlerEdit(null)} className="btn btn-secondary my-1 " type="button">
                        Cancelar
                    </button>
                    <button className="btn btn-success my-1" type="submit">
                        Guardar
                    </button>

                    </div>
                   
                </div>
              
            </form>
            }
           
        </>
    );
};
