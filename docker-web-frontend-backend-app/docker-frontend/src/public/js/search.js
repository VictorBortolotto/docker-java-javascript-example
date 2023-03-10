var list = [];
var queryMode = false;
var pagePosition = 0;

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
            let response = await findById(id.value);   
            if(response != null){
                configureButtonOutQueryMode(buttonDelete, buttonSend, buttonSaveChanges);
                setFieldsValues(id, name, price, description, color, length, scale, response.product);
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
    dialogSearchAllProducts.close();
    let listProducts = await findAllProductsToList();
    let pages = document.getElementById('pages');

    if(listProducts != null){
        let html = '';

        if(listProducts.productsList.length <= 20){

            for(let i = 0; i < listProducts.productsList.length; i++){
                let products = listProducts.productsList[i];
                html += createListElementInHtml(products, i);
            }
            pages.innerHTML = '<a class="page" id="page-0">1</a>';

            addCssToPageNumbers(1);
            addHtmlToUl(html);

            for(let i = 0; i < listProducts.productsList.length; i++){
                addCssToListElements(i);
            }
        }else{
            list = removeEmptyPages(separeteProductsPerPages(listProducts.productsList));

            addHtmlToUl(list[0]);

            for(let i = 0; i < 21; i++){
                addCssToListElements(i);
            } 

            let htmlPages = generatePagesNumbers(list);
            pages.innerHTML = htmlPages;
            addCssToPageNumbers(list.length);
        }
        
    }else {
        pages.innerHTML = '<a class="page" id="page-0">1</a>';
        addCssToPageNumbers(1);
        return;
    }
}

function addHtmlToUl(html){
    let ul = document.getElementById("products-list");
    ul.innerHTML = html;
}

function removeEmptyPages(listPages){
    for(let i = 0; i < listPages.length; i++){
        if(listPages[i] === ''){
            listPages.length = listPages.length - 1;
        }
    }

    return listPages;
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

function onClickButtonNext(){
    let ul = document.getElementById("products-list");
    pagePosition = pagePosition + 1;

    if(pagePosition > (list.length - 1)){
        pagePosition = list.length;
        return;
    }else{
        let html = list[pagePosition]
        ul.innerHTML = html;
    
        let liId = ul.childNodes[0].id
        let liPosition = parseInt(liId.replace('product-list-item-', ''));
    
        let count = 0;
        pagePosition == 0 ? count = liPosition + 21 : count = liPosition + 20;
        for(let i = liPosition; i < (count); i++){
            addCssToListElements(i);
        } 
    }    
}

function onClickButtonPrevious(){
    let ul = document.getElementById("products-list");
    pagePosition = pagePosition - 1;

    if(pagePosition < 0){
        pagePosition = 0
        return;
    }

    let html = list[pagePosition]
    ul.innerHTML = html;

    let liId = ul.childNodes[0].id
    let liPosition = parseInt(liId.replace('product-list-item-', ''));
    
    let count = 0;
    pagePosition == 0 ? count = liPosition + 21 : count = liPosition + 20;
    for(let i = liPosition; i < (count); i++){
        addCssToListElements(i);
    } 
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

function separeteProductsPerPages(productsList){
    let totalPages = calculateTheTotalPages(productsList);
    let countProductsPerPage = 0;
    let html = '';
    let listProductsPerPage = [];
    let count = 0;

    for(let i = 0; i < totalPages; i++){
        for(let x = 0; x < productsList.length; x++){
            if(countProductsPerPage <= 20){
                let product = productsList[x];
                html += createListElementInHtml(product, x);
                countProductsPerPage = x;
                if (countProductsPerPage == 20) {  
                    countProductsPerPage = countProductsPerPage + 1;
                    break;
                }
            }else {
                count = count + 1;
                let product = productsList[countProductsPerPage];
                if(countProductsPerPage <= (productsList.length - 1)){
                    html += createListElementInHtml(product, countProductsPerPage);
                }
                countProductsPerPage = countProductsPerPage + 1;

                if(count == 20){
                    count = 0;
                    break;
                }
            }
        }
        listProductsPerPage[i] = html;
        html = '';
    }

    return listProductsPerPage;
}

function calculateTheTotalPages(productsList){
    let length = 0;

    if(productsList.length % 2 == 1){
        length = (productsList.length / 20) + 1;
    }else{
        length = productsList.length / 20;
    }

    return length;
}

function onClickProductsList(itemId){

    let listItem = document.getElementById(itemId);
    let dialogProducts = document.getElementById('dialog-products');
    let listElement = listItem.getElementsByClassName('list-item');
    
    let product = {
        id: 0,
        name: '',
        description: '',
        scale: '',
        length: 0.0,
        price: ''
    };

    for(let i = 0; i < listElement.length; i++){
        let elementId = listElement.item(i).id;
        let element = document.getElementById(elementId);
        let value = element.innerText;

        if (i == 0){
            product.id = value;
        }
        
        if (i == 1){
            product.name = value;
        }
        
        if (i == 2){
            product.description = value;
        }
        
        if (i == 3){
            product.color = value;
        }
        
        if (i == 4){
            product.length = parseFloat(value);
        }
        
        if (i == 5){
            product.scale = value;
        }
        
        if (i == 6){
            product.price = parseFloat(value);
        }
    }

    let id = document.getElementById("id");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let color = document.getElementById("color");
    let length = document.getElementById("length");
    let scale = document.getElementById("selection");
    let price = document.getElementById("price");

    let buttonSend = document.getElementById("send");
    let buttonDelete = document.getElementById("delete");
    let buttonSaveChanges = document.getElementById("update");

    configureButtonOutQueryMode(buttonDelete, buttonSend, buttonSaveChanges);
    setFieldsValues(id, name, price, description, color, length, scale, product);
    activateFields(id, name, price, description, color, length, scale);
    queryMode = false;

    dialogProducts.close();
    
}

function generatePagesNumbers(listPages){
    let page = 0;
    let html = '';

    for(let i = 0; i < listPages.length; i++){
        if(listPages[i] !== ''){
            page = page + 1
            if(i == 0){
                html += `<a class="page" onclick="onClickPageButtons()" id="page-${i}">${page}</a>`
            }else {
                html += `<a class="page" onclick="onClickPageButtons()" id="page-${i}">${page}</a>`
            }
        }
    }

    return html;
}

function addCssToPageNumbers(totalPages){
    for(let i = 0; i < totalPages; i++){
        let a = document.getElementById(`page-${i}`);
        if(i == 0){
            a.style.marginRight = '5px';
            a.style.marginLeft = '5px';
        }else{
            a.style.marginRight = '5px';
        }
    }
}

function onClickPageButtons(){
    let page = document.getElementById('pages');
    let ul = document.getElementById("products-list");
    page.addEventListener("click", event => {
        let idButton = event.target.id;
        let listButtonPosition = parseInt(idButton.replace('page-', ''));

        let html = list[listButtonPosition];
        ul.innerHTML = html;
        pagePosition = listButtonPosition;

        let liId = ul.childNodes[0].id;
        let liPosition = parseInt(liId.replace('product-list-item-', ''));
        
        let count = 0;
        listButtonPosition == 0 ? count = liPosition + 21 : count = liPosition + 20;

        for(let i = liPosition; i < (count); i++){
            addCssToListElements(i);
        } 
    })
}

function createListElementInHtml(product, listPosition){
    let html = `<li class="product-list-item" onclick="onClickProductsList(this.id)" id="product-list-item-${listPosition}">
                    <div class="list-item" id="product-id-${listPosition}">${product.id}</div>
                    <div class="list-item" id="product-name-${listPosition}">${product.name}</div>
                    <div class="list-item" id="product-description-${listPosition}">${product.description}</div>
                    <div class="list-item" id="product-color-${listPosition}">${product.color}</div>
                    <div class="list-item" id="product-length-${listPosition}">${product.length}</div>
                    <div class="list-item" id="product-scale-${listPosition}">${product.scale}</div>
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
    li.style.height = '6%';
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

function setFieldsValues(id, name, price, description, color, length, scale, product){
    id.value = product.id;
    price.value = product.price;
    name.value = product.name;
    description.value = product.description;
    color.value = product.color;
    length.value = product.length;
    scale.value = product.scale
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
    let ul = document.getElementById("products-list");
    ul.innerHTML = "";

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