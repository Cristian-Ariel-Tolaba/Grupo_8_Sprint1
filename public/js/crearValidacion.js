console.log('conect succeful!');

const formStore = $('form-store');
const elements = formStore.elements;
console.log(elements);

let totalCharacter = 350;
let numberCharacter = 350;

const msgError = (element, msg, event) => {
    $(element).style.color = "red";
    $(element).innerHTML = msg;
    event.target.classList.add('is-invalid');
  };
  
  const cleanError = (element, {target}) => {
    target.classList.remove('is-invalid');
    target.classList.remove('is-valid');
    $(element).innerHTML = null;
  };
  
  const validField = (element, {target}) => {
    $(element).innerHTML = null;
    target.classList.remove('is-invalid')
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

 


$('name').addEventListener('focus', function(e){
    cleanError('msgName', e)
});
$('name').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
          msgError('msgName', 'El nombre es obligatorio', e)
          break;
        case this.value.trim().length < 5:
          msgError('msgName', 'El nombre debe tener como mínimo 5 caracteres', e)
          break;
        default:
          validField('msgName', e)
          break;
      }
      checkFields()

});



$('category').addEventListener('blur', function(e){
    switch (true) {
        case !this.value:
          msgError('msgCategory','Debe indicar la categoría', e)
          break;
        default:
          validField('msgCategory', e)
          break;
      }
      checkFields() 
});


$('price').addEventListener('focus', function(e){
    cleanError('msgPrice', e)
});
$('price').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
          msgError('msgPrice', 'El precio es requerido', e)
          break;
        case this.value < 0:
          msgError('msgPrice', 'Debe ingresar solo números positivos', e)
          break;
        default:
          validField('msgPrice', e)
          break;
      }
      checkFields() 
});

$('price').addEventListener('keyup', function(e){
    let price = this.value;
    let discount = $('discount').value;
    $('price-final').value = +price- (+price * +discount / 100);
});
$('discount').addEventListener('keyup', function(e){
    let price = $('price').value;
    let discount = this.value
    $('price-final').value = +price- (+price * +discount / 100);
});


$('description').addEventListener('focus', function(e){
    $('descriptionInfo').hidden = false;
    $('numberCharacter').innerHTML = numberCharacter;

    cleanError('msgDescription', e)

});
$('description').addEventListener('blur', function(e){
    $('descriptionInfo').hidden = true;

    switch (true) {
      case !this.value.trim():
        msgError('msgDescription', 'La descripción es requerido', e)
        break;
      case this.value.trim().length < 5:
        msgError('msgDescription', 'La descripción debe tener como mínimo 5 caracteres', e)
        break;
      case this.value.trim().length >= 350:
        msgError('msgDescription', 'La descripción no debe superar los 350 caracteres', e)
        break;
      default:
        validField('msgDescription', e)
        break;
    }

    checkFields()
});
$('description').addEventListener('keyup', function (e) {
   
    numberCharacter = totalCharacter -  +this.value.length

   $('numberCharacter').innerHTML =  numberCharacter;

   if(numberCharacter <= 0){
    $('descriptionInfo').hidden = true;
    msgError('msgDescription', 'La descripción no debe superar los 350 caracteres', e)
   }else {
    $('descriptionInfo').hidden = false;
    cleanError('msgDescription', e)
   }
});


$('image').addEventListener('change', function(e){
    //console.log(e.target.files[0]);

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        $('imagePrev').src = reader.result
    }

    checkFields()
});
