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


$("email").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("advEmail","El email es obligatorio",e);
        break;
        case !this.value.trim().length < 3:
        msgError("advEmail","El apellido debe contener como minimo 3 caracteres",e);
        break;
        case !exRegEmail.test(this.value):
        msgError("advEmail","Formato invalido",e);
        break
        default:
            validField("advEmail",e)
            break;
    }
});

$("email").addEventListener("focus", function(){
    cleanField("advEmail")
});


$("password").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("advPassword","La contaseña es obligatoria",e);
        break;
        case !exRegPass.test(this.value):
        msgError("advPassword","La contaseña debe tener entre 8 y 12 caracteres, un numero, una mayuscula y un caracter especial",e);
        break;
        default:
            validField("advPassword",e)
            break;
    }
});

$("password").addEventListener("focus", function(){
    cleanField("advPassword")
});


$("password2").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("advPassword2","Confirma tu contraseña",e);
        break;
        case !exRegPass.test(this.value):
        msgError("advPassword2","Las contaseñas no coinciden",e);
        break;
        default:
            validField("advPassword2",e)
            break;
    }
});

$("password2").addEventListener("focus", function(){
    cleanField("advPassword2")
});






