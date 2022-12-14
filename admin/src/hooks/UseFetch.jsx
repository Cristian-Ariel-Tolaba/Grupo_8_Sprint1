import React from 'react'

const UseFetch = async(endpoint, method = 'GET', data, token) => {

    const apiUrlBase = process.env.REACT_APP_API_URL_BASE;
    
    const url = apiUrlBase + endpoint;

    let response;

    if(method === 'GET'){
        response = await fetch(url)
    }
    if(method === 'POST' || method === "PATCH"){
        response = await fetch(url,{
            method,
            body: data,
            headers: {
                Authorization: token
            }
        })
    }
    if(method === 'DELETE'){
        response = await fetch(url,{
            method,
            headers: {
                Authorization: token
            }
        })
    }

    let result = await response.json()

    return result
}

export default UseFetch








