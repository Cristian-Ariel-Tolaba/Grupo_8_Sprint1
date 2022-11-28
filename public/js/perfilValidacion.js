console.log('¡Conexion exitosa!');

const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
const exRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}/;

const $ =(element) => document.getElementById(element)
const qs = (element)=> document.querySelector(element)
const qsa = (element)=> document.querySelectorAll(element)

const msgError = (element,msg) =>{
    $(element).innerText = msg;
};

const cleanField = (element) => {
    $(element).innerText = null;
};

const validField = (element) => {
    cleanField(element)
};

$("firstname").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("advName","El nombre es obligatorio",e);
        break;
        case !this.value.trim().length < 3:
        msgError("advName","El nombre debe contener como minimo 3 caracteres",e);
        break;
        case !exRegAlfa.test(this.value):
        msgError("advName","El nombre solo debe contener caracteres alfabeticos",e);
        break
        default:
            validField("advName",e)
            break;
    }
});

$("firstname").addEventListener("focus", function(){
    cleanField("advName")
});


$("lastname").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("advLastName","El apellido es obligatorio",e);
        break;
        case !this.value.trim().length < 3:
        msgError("advLastName","El apellido debe contener como minimo 3 caracteres",e);
        break;
        case !exRegAlfa.test(this.value):
        msgError("advLastName","El apellido solo debe contener caracteres alfabeticos",e);
        break
        default:
            validField("advLastName",e)
            break;
    }
});

$("lastname").addEventListener("focus", function(){
    cleanField("advLastName")
});


//foto del usuario 
