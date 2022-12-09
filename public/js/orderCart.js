console.log('orderCart success!');

$('btn-cart') && $('btn-cart').addEventListener('click', async()=>{
    try {
        let response = await fetch('/api/carts');
        let result = await response.json();

        if(result.ok){
         
        }

        console.log(result)

    } catch (error) {
        console.error
    }
})