async function onClickSend(){

    const product = {
        name: '',
        description: '',
        color: '',
        length: 0.0,
        scale: '',
        price: 0.0
    }

    product.name = document.getElementById("name").value
    product.description = document.getElementById("description").value
    product.color = document.getElementById("color").value
    product.length = document.getElementById("length").value
    product.scale = document.getElementById("selection").value
    product.price = document.getElementById("price").value

    if((product.name === '' || product.name === null) || 
        (product.description === '' || product.description === null) || 
        (product.color === '' || product.color === null) || 
        (product.scale === '' || product.scale === null)){
        snackbar('orange', 'Please, fill all the fields!');
        return;
    }

    if((product.price === 0.0 || product.price === null) || (product.length === 0.0 || product.length === null)){
        snackbar('orange', 'Values in the fields price and length, cannot be zero!');
        return;
    }

    let response = await createProduct(product);
    if(response.statusCode === 200){
        let buttonExitQueryMode = document.getElementById("exit");
        buttonExitQueryMode.click();
        snackbar('green', response.message);
    }else {
        snackbar('red', response.message)
    }
}
