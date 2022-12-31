var queryMode = false;

async function search(){
    let buttonSend = document.getElementById("send");
    let buttonDelete = document.getElementById("delete");
    let buttonExitQueryMode = document.getElementById("exit");

    let id = document.getElementById("id");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let color = document.getElementById("color");
    let length = document.getElementById("length");
    let scale = document.getElementById("selection");
    let price = document.getElementById("price");

    if(!queryMode){
        id.removeAttribute("readonly")   
        buttonDelete.setAttribute("hidden", true);   
        buttonExitQueryMode.removeAttribute("hidden");
        cleanFields(id, name, price, description, color, length, scale);
        deactivateButtons(buttonDelete, buttonSend);
        deactivateFields(name, price, description, color, length, scale);
        queryMode = true;
    }else{
        if(id.value !== '' && id.value !== null){
            let product = await findById(id.value);   
            if(product != null){
                buttonDelete.removeAttribute("hidden")
                setFieldsValues(id, name, price, description, color, length, scale, product); 
                activateButtons(buttonDelete, buttonSend);
                activateFields(id, name, price, description, color, length, scale);
                queryMode = false
            }
        }else{
            snackbar('blue', "Please, fill the id field before search.");
            return;
        }
    }
}

function exit(){
    let buttonDelete = document.getElementById("delete");
    let buttonSend = document.getElementById("send");
    let buttonExitQueryMode = document.getElementById("exit");

    let id = document.getElementById("id");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let color = document.getElementById("color");
    let length = document.getElementById("length");
    let scale = document.getElementById("selection");
    let price = document.getElementById("price");

    exitQueryMode(id, name, price, description, color, length, scale, buttonDelete, buttonSend, buttonExitQueryMode);
}

function exitQueryMode(id, name, price, description, color, length, scale, buttonDelete, buttonSend, buttonExitQueryMode){
    buttonDelete.setAttribute("hidden", true)
    buttonExitQueryMode.setAttribute("hidden", true);
    activateButtons(buttonDelete, buttonSend);
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

function activateButtons(buttonDelete, buttonSend){
    buttonDelete.removeAttribute('disabled');
    buttonSend.removeAttribute('disabled');
}

function deactivateButtons(buttonDelete, buttonSend){
    buttonDelete.setAttribute('disabled', ' ');
    buttonSend.setAttribute('disabled', '');
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