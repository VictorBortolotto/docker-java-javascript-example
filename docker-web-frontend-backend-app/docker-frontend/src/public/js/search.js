var queryMode = false;

async function onClickSearch(){
    let buttonSend = document.getElementById("send");
    let buttonDelete = document.getElementById("delete");
    let buttonExitQueryMode = document.getElementById("exit");
    let buttonSaveChanges = document.getElementById("update");
    let dialogSearchAllProducts = document.getElementById("dialog");

    let id = document.getElementById("id");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let color = document.getElementById("color");
    let length = document.getElementById("length");
    let scale = document.getElementById("selection");
    let price = document.getElementById("price");

    if(!queryMode){
        id.removeAttribute("readonly");
        configureButtonInQueryMode(buttonDelete, buttonSend, buttonExitQueryMode, buttonSaveChanges);
        cleanFields(id, name, price, description, color, length, scale);
        deactivateFields(name, price, description, color, length, scale);
        queryMode = true;
    }else{
        if(id.value !== '' && id.value !== null){
            let product = await findById(id.value);   
            if(product != null){
                configureButtonOutQueryMode(buttonDelete, buttonSend, buttonSaveChanges)
                setFieldsValues(id, name, price, description, color, length, scale, product);
                activateFields(id, name, price, description, color, length, scale);
                queryMode = false
            }
        }else{
            dialogSearchAllProducts.showModal();
        }
    }
}

function onClickDialogButtonNo(){
    let dialogSearchAllProducts = document.getElementById("dialog");
    dialogSearchAllProducts.close();
}

async function onClickDialogButtonYes(){
    let dialogProducts = document.getElementById("dialog-products");
    let dialogSearchAllProducts = document.getElementById("dialog");
    dialogProducts.showModal();
    dialogSearchAllProducts.close()
    let listProducts = await findAllProductsToList();

    if(listProducts != null){
        let ul = document.getElementById("products-list");
        let html = '';

        for(let i = 0; i < listProducts.productsList.length; i++){
            let product = listProducts.productsList[i];
            html += createListElementInHtml(product, i);
        }

        ul.innerHTML = html;

        for(let i = 0; i < listProducts.productsList.length; i++){
            addCssToListElements(i);
        }
    }else {
        return;
    }
}

function createListElementInHtml(product, listPosition){
    let html = `<li class="product-list-item" id="product-list-item-${listPosition}">
                    <div class="list-item" id="product-id-${listPosition}">${product.id}</div>
                    <div class="list-item" id="product-name-${listPosition}">${product.productName}</div>
                    <div class="list-item" id="product-description-${listPosition}">${product.productDescription}</div>
                    <div class="list-item" id="product-color-${listPosition}">${product.color}</div>
                    <div class="list-item" id="product-length-${listPosition}">${product.productLength}</div>
                    <div class="list-item" id="product-scale-${listPosition}">${product.productScale}</div>
                    <div class="list-item" id="product-price-${listPosition}">${product.price}</div>
                </li>`;

    return html;
}

function addCssToListElements(listPosition) {
    let li = document.getElementById(`product-list-item-${listPosition}`);
    li.style.display = 'flex';
    li.style.flexDirection = 'row';
    li.style.alignItems = 'center';
    li.style.listStyle = 'none';
    li.style.width = '100%';
    li.style.height = '5%';
    li.style.borderBottom = 'solid black 1px'

    let productId = document.getElementById(`product-id-${listPosition}`);
    productId.style.width = '10%';
    productId.style.borderRight = 'solid black 1px';

    let productName = document.getElementById(`product-name-${listPosition}`);
    productName.style.width = '15%';
    productName.style.borderRight = 'solid black 1px';

    let productDescription = document.getElementById(`product-description-${listPosition}`);
    productDescription.style.width = '40%';
    productDescription.style.borderRight = 'solid black 1px';

    let productColor = document.getElementById(`product-color-${listPosition}`);
    productColor.style.width = '15%';
    productColor.style.borderRight = 'solid black 1px';

    let productLength = document.getElementById(`product-length-${listPosition}`);
    productLength.style.width = '10%';
    productLength.style.borderRight = 'solid black 1px';

    let productScale = document.getElementById(`product-scale-${listPosition}`);
    productScale.style.width = '10%';
    productScale.style.borderRight = 'solid black 1px';
    
    let productPrice = document.getElementById(`product-price-${listPosition}`);
    productPrice.style.width = '10%';

}

async function findAllProductsToList(){

    let response = await findAllProduct();

    if(response.statusCode == 200){
        snackbar('green', response.message);
    }else {
        snackbar('blue', response.message);
        return null;
    }

    return response;
}

function configureButtonOutQueryMode(buttonDelete, buttonSend, buttonSaveChanges){
    buttonSend.setAttribute("hidden", true);
    buttonDelete.removeAttribute("hidden");
    buttonSaveChanges.removeAttribute("hidden");
}

function configureButtonInQueryMode(buttonDelete, buttonSend, buttonExitQueryMode, buttonSaveChanges){
    buttonDelete.setAttribute("hidden", true);   
    buttonExitQueryMode.removeAttribute("hidden");
    buttonSend.setAttribute("hidden", true);
    buttonSaveChanges.setAttribute("hidden", true)
}

function exit(){
    let buttonDelete = document.getElementById("delete");
    let buttonSend = document.getElementById("send");
    let buttonExitQueryMode = document.getElementById("exit");
    let buttonSaveChanges = document.getElementById("update")

    let id = document.getElementById("id");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let color = document.getElementById("color");
    let length = document.getElementById("length");
    let scale = document.getElementById("selection");
    let price = document.getElementById("price");

    exitQueryMode(id, name, price, description, color, length, scale, buttonDelete, buttonSend, buttonExitQueryMode, buttonSaveChanges);
}

function exitQueryMode(id, name, price, description, color, length, scale, buttonDelete, buttonSend, buttonExitQueryMode, buttonSaveChanges){
    buttonDelete.setAttribute("hidden", true)
    buttonExitQueryMode.setAttribute("hidden", true);
    buttonSaveChanges.setAttribute("hidden", true);
    buttonSend.removeAttribute("hidden");
    activateFields(id, name, price, description, color, length, scale);
    cleanFields(id, name, price, description, color, length, scale);
    queryMode = false
}

function  cleanFields(id, name, price, description, color, length, scale) {
    id.value = ''
    price.value = 0.0;
    name.value = '';
    description.value = '';
    color.value = '';
    length.value = 0.0;
    scale.value = 'CM'
}

function activateFields(id, name, price, description, color, length, scale) {
    id.setAttribute("readonly", true)
    name.removeAttribute("readonly")
    description.removeAttribute("readonly")
    color.removeAttribute("readonly")
    length.removeAttribute("readonly")
    scale.removeAttribute("readonly")
    price.removeAttribute("readonly")
}

function  deactivateFields(name, price, description, color, length, scale) {
    name.setAttribute("readonly",'')
    description.setAttribute("readonly",'')
    color.setAttribute("readonly",'')
    length.setAttribute("readonly",'')
    scale.setAttribute("readonly",'')
    price.setAttribute("readonly",'')
}

async function findById(id){
    let product = await findProductById(id);

    if(product.statusCode == 404){
        snackbar('blue', product.message);
        product = null;
        return;
    }else{
        snackbar('green', product.message);
        queryMode = true;
    }

    return product;
}

function setFieldsValues(id, name, price, description, color, length, scale, product){
    id.value = product.product.id;
    price.value = product.product.price;
    name.value = product.product.productName;
    description.value = product.product.productDescription;
    color.value = product.product.color;
    length.value = product.product.productLength;
    scale.value = product.product.productScale
}