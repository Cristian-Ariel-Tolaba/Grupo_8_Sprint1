console.log('¡Conexion exitosa!');

const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
const exRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}/;

const $ =(element) => document.getElementById(element)

const msgError = (element,msg) =>{
    $(element).innerText = msg;
};

const cleanField = (element) => {
    $(element).innerText = null;
};

const validField = (element) => {
    cleanField(element)
};

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

