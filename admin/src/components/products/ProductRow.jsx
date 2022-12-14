import React from 'react'

export const ProductRow = ({ id, name, price, discount,handlerEdit,handlerDelete }) => {
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{price}</td>
            <td>{discount}</td>
            <td>
                <div className="d-flex justify-content-around">
                    <button className='btn btn-sm btn-success' style={{ width: '30px' }} onClick={() => handlerEdit(id)}><i className='fas fa-edit'></i></button>
                    <button className='btn btn-sm btn-danger' style={{ width: '30px' }} onClick={() => handlerDelete(id)}><i className='fas fa-trash'></i></button>

                </div>
            </td>
        </tr>
    )
}
