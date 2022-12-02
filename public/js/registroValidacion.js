console.log('¡Conexion exitosa!');

const formRegister = $('form-register');
const elements = formRegister.elements;
console.log(elements);

const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
const exRegPass = /(?=(.*[0-8]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/

const msgError = (element, msg, {target}) =>{
    $(element).innerText = msg;
    target.classList.add('is-invalid');
};

const cleanField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove('is-invalid', 'is-valid')
};

const validField = (element, {target}) => {
    cleanField(element, target)
    target.classList.add('is-valid');
};


const checkFields = () => {
    let error = false;
    for(let i = 0; i < elements.length - 1; i++){

        if(!elements[i].value || elements[i].classList.contains('is-invalid')){
            error = true
        }
        console.log(error)
    }
    
    if(!error){
        $('btn-submit').disabled = false;
      }else{
        $('btn-submit').disabled = true;
      };
}

$("firstname").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("msgFirstname","El nombre es obligatorio",e);
        break;
        case this.value.trim().length < 3:
        msgError("msgFirstname","El nombre debe contener como minimo 3 caracteres",e);
        break;
        case !exRegAlfa.test(this.value):
        msgError("msgFirstname","Solo debe contener caracteres alfabeticos",e);
        break;
        default:
            validField("msgFirstname",e)
            break;
    }
    checkFields()

});

$("firstname").addEventListener("focus", function({target}){
    cleanField("msgFirstname", target)
});


$("lastname").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("msgLastname","El apellido es obligatorio",e);
        break;
        case this.value.trim().length < 3:
        msgError("msgLastname","El apellido debe contener como minimo 3 caracteres",e);
        break;
        case !exRegAlfa.test(this.value):
        msgError("msgLastname","Solo debe contener caracteres alfabeticos",e);
        break
        default:
            validField("msgLastname",e)
            break;
    }
    checkFields()
});

$("lastname").addEventListener("focus", function({target}){
    cleanField("msgLastname", target)
});


$("email").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("msgEmail","El email es obligatorio",e);
        break;
        case !exRegEmail.test(this.value):
        msgError("msgEmail","El email tiene un formato invalido",e);
        break
        default:
            validField("msgEmail",e)
            break;
    }
    checkFields()
});

$("email").addEventListener("focus", function(){
    cleanField("msgEmail")
});


$("password").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("msgPassword","La contaseña es obligatoria",e);
        break;
        case !exRegPass.test(this.value):
        msgError("msgPassword","La contaseña debe tener entre 8 y 12 caracteres, un numero, una mayúscula y un caracter especial",e);
        break;
        default:
            validField("msgPassword",e)
            break;
    }
    checkFields()
});

$("password").addEventListener("focus", function({target}){
    cleanField("msgPassword", target)
});


$("password2").addEventListener("blur",function(e){
    switch (true){
        case !this.value.trim():
        msgError("msgPassword2","Confirma tu contraseña",e);
        break;
        case this.value !== $('password').value:
        msgError("msgPassword2","Las contaseñas no coinciden",e);
        break;
        default:
            validField("msgPassword2",e)
            break;
    }
    checkFields()
});

$("password2").addEventListener("focus", function({target}){
    cleanField("msgPassword2", target)
});
 

$('avatar').addEventListener('change', function(e){
    switch (true){
        case !this.value:
        msgError("avatar","Debes subir una imagen",e);
        break;
        default:
            validField("msgAvatar",e)
            break;
    }
    
    checkFields()
}); 






