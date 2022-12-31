async function send(){

    const product = {
        productName: '',
        productDescription: '',
        color: '',
        productLength: 0.0,
        productScale: '',
        price: 0.0
    }

    product.productName = document.getElementById("name").value
    product.productDescription = document.getElementById("description").value
    product.color = document.getElementById("color").value
    product.productLength = document.getElementById("length").value
    product.productScale = document.getElementById("selection").value
    product.price = document.getElementById("price").value

    if((product.productName === '' || product.productName === null) || 
        (product.productDescription === '' || product.productDescription === null) || 
        (product.color === '' || product.color === null) || 
        (product.productScale === '' || product.productScale === null)){
        snackbar('orange', 'Please, fill all the fields!');
        return;
    }

    if((product.price === 0.0 || product.price === null) || (product.productLength === 0.0 || product.productLength === null)){
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
