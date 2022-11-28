console.log('¡Conexion exitosa!');

const $ =(element) => document.getElementById(element)
const qs = (element)=> document.querySelector(element)
const qsa = (element)=> document.querySelectorAll(element)

let totalCharacters = 500;
let numberCharacters = 500; 

const validField = (element, {target}) => {
    $(element).innerHTML = null;
    target.classList.remove('errorText')
    target.classList.add('is-valid');
};

const checkFields = () => {
    let error = false;
    for (let i = 0; i < elements.length - 1; i++) {
        
        if(!elements[i].value || elements[i].classList.contains('errorText')) {
        error = true
        }
        console.log(error)
    }
}


$("name").addEventListener("blur", function (e) {
    switch (true) {
        case !this.value.trim():
            msgError("advName", "El nombre es necesario", e)
            break;
        case this.value.trim().length < 10:
            msgError("advName", "El nombre del producto debe tener mínimo 10 carácteres", e)
            break;            
        default:
            validField("advName", e)
            break;
    }   
    checkFields()
})

$("name").addEventListener("focus", function (e) {
    cleanError("advName", e)
})


("category").addEventListener("blur", function (e) {
    switch (true) {
        case !this.value:        
            msgError("advCategory", "Debes elegir una categoría", e)
            break;        
        default:
            validField("advCategory", e)
            break;
    }   
    checkFields()
})

$("price").addEventListener("blur", function (e) {
    switch (true) {
        
        case !this.value.trim():
            msgError("advPrecio" , "Debe poner un precio")
            break;
       
        case this.value < 9:
            msgError("advPrecio" , "No puede ingresar un precio menor a 0")
            break;
        default: 
            validField("advPrecio", e)
            break;
        }           
    checkFields()
    })


$("price").addEventListener("keyup", function (e) {
    let price = this.value
    let discount = $("discount").value; 
    
    $("finalPrice").innerText = `Precio final: ${+price - (+price * +discount / 100)}`
    $("discountApply").innerText = `Descuento aplicado: ${+price * +discount / 100}`
})



//$("discount").addEventListener("blur", function (e) //



$("description").addEventListener("blur", function (e) {
    
    switch (true) {
        case !this.value.trim():
            msgError("advDescripcion", "Necesitas ingresar una descripción", e)
            break;
        case this.value.trim().length < 10:
            msgError("advDescripcion", "Debe contener como mínimo 10 carácteres", e)
            break;
        case this.value.trim().length >= 500:
            msgError("advDescripcion", "Debe contener como máximo 500 carácteres", e)
            break;
        default:
            validField("advDescripcion", e)
            break;
    }
    checkFields()
})

$("description").addEventListener("focus", function (e) {
    $("numberCharacters").innerHTML = numberCharacters

    cleanError("advDescripcion", e)
})



