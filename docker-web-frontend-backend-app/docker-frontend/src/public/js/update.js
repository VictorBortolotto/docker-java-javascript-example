async function onClickUpdate(){
    let id = document.getElementById("id");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let color = document.getElementById("color");
    let length = document.getElementById("length");
    let scale = document.getElementById("selection");
    let price = document.getElementById("price");

    let latestProduct = await findProductById(id.value);

    let buttonExitQueyMode = document.getElementById("exit");
    let productOriginalPrice = latestProduct.product.price;
    let productOriginalName = latestProduct.product.productName;
    let productOriginalDescription = latestProduct.product.productDescription;
    let productOriginalColor = latestProduct.product.color;
    let productOriginalLength = latestProduct.product.productLength;
    let productOriginalScale = latestProduct.product.productScale;

    const product = {
        productName: '',
        productDescription: '',
        color: '',
        productLength: 0.0,
        productScale: '',
        price: 0.0
    }

    product.name = name.value;
    product.description = description.value;
    product.color = color.value;
    product.length = length.value;
    product.scale = scale.value;
    product.price = price.value;

    let response = null;
    if((productOriginalPrice !== product.price) && 
       (productOriginalName !== product.name) && 
       (productOriginalDescription !== product.description) &&
       (productOriginalColor !== product.color) &&
       (productOriginalLength !== product.length) &&
       (productOriginalScale !== product.scale)){
        response = await updateProduct(id.value, product);
    }

    if(productOriginalName !== product.name && response == null){
        response = await updateProductName(id.value, product);
    }

    if(productOriginalPrice != product.price && response == null){
        response = await updateProductPrice(id.value, product);
    }

    if(productOriginalDescription !== product.description  && response == null){
        response = await updateProductDescription(id.value, product);
    }

    if(productOriginalColor !== product.color && response == null){
        response = await updateProductColor(id.value, product);
    }

    if(productOriginalLength != product.length && response == null){
        response = await updateProductLength(id.value, product);
    }

    if(productOriginalScale !== product.scale && response == null){
        response = await updateProductScale(id.value, product);
    }

    if(response.statusCode == 200){
        snackbar('green', response.message);
        buttonExitQueyMode.click();
    }else{
        snackbar('blue', response.message);
        return;
    }
}