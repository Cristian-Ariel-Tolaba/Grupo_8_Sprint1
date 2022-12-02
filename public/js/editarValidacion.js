console.log('conect succeful!');

const formEdit = $('form-edit');
const elements = formEdit.elements;
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
    for(let i = 0; i < elements.length - 2; i++){

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
    cleanError('msgNameEdit', e)
});
$('name').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
          msgError('msgNameEdit', 'El nombre es obligatorio', e)
          break;
        case this.value.trim().length < 5:
          msgError('msgNameEdit', 'El nombre debe tener como mínimo 5 caracteres', e)
          break;
        default:
          validField('msgNameEdit', e)
          break;
      }
      checkFields()

});



$('category').addEventListener('blur', function(e){
    switch (true) {
        case !this.value:
          msgError('msgCategoryEdit','Debe indicar la categoría', e)
          break;
        default:
          validField('msgCategoryEdit', e)
          break;
      }
      checkFields() 
});


$('price').addEventListener('focus', function(e){
    cleanError('msgPriceEdit', e)
});
$('price').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
          msgError('msgPriceEdit', 'El precio es requerido', e)
          break;
        case this.value < 0:
          msgError('msgPriceEdit', 'Debe ingresar solo números positivos', e)
          break;
        default:
          validField('msgPriceEdit', e)
          break;
      }
      checkFields() 
});


$('description').addEventListener('focus', function(e){
    $('descriptionInfo').hidden = false;
    $('numberCharacter').innerHTML = numberCharacter;

    cleanError('msgDescriptionEdit', e)

});
$('description').addEventListener('blur', function(e){
    $('descriptionInfo').hidden = true;

    switch (true) {
      case !this.value.trim():
        msgError('msgDescriptionEdit', 'La descripción es requerido', e)
        break;
      case this.value.trim().length < 5:
        msgError('msgDescriptionEdit', 'La descripción debe tener como mínimo 5 caracteres', e)
        break;
      case this.value.trim().length >= 350:
        msgError('msgDescriptionEdit', 'La descripción no debe superar los 350 caracteres', e)
        break;
      default:
        validField('msgDescriptionEdit', e)
        break;
    }

    checkFields()
});
$('description').addEventListener('keyup', function (e) {
   
    numberCharacter = totalCharacter -  +this.value.length

   $('numberCharacter').innerHTML =  numberCharacter;

   if(numberCharacter <= 0){
    $('descriptionInfo').hidden = true;
    msgError('msgDescriptionEdit', 'La descripción no debe superar los 350 caracteres', e)
   }else {
    $('descriptionInfo').hidden = false;
    cleanError('msgDescriptionEdit', e)
   }
});