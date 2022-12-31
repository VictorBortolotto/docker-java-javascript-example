var queryMode = false;

async function search(){
    let buttonSend = document.getElementById("send");
    let buttonDelete = document.getElementById("delete");
    let buttonExitQueryMode = document.getElementById("exit");
    let buttonSaveChanges = document.getElementById("update");

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
            snackbar('blue', "Please, fill the id field before search.");
            return;
        }
    }
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