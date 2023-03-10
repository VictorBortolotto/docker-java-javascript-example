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
    let productOriginalName = latestProduct.product.name;
    let productOriginalDescription = latestProduct.product.description;
    let productOriginalColor = latestProduct.product.color;
    let productOriginalLength = latestProduct.product.length;
    let productOriginalScale = latestProduct.product.scale;

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

    if(productOriginalName !== product.name){
        response = await updateProductName(id.value, product);
    }

    if(productOriginalPrice != product.price){
        response = await updateProductPrice(id.value, product);
    }

    if(productOriginalDescription !== product.description){
        response = await updateProductDescription(id.value, product);
    }

    if(productOriginalColor !== product.color){
        response = await updateProductColor(id.value, product);
    }

    if(productOriginalLength != product.length){
        response = await updateProductLength(id.value, product);
    }

    if(productOriginalScale !== product.scale){
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