const currentRoute = "http://localhost:8080/api"

const HTTP = {
    post: "POST",
    get: "GET",
    patch: "PATCH",
    delete: "DELETE",
    put: "PUT"
}

async function createProduct(product) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.post,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
    }

    let response = await fetch(currentRoute + `/product/new`, request).then(response => response.json());
    return response;
}

async function findProductById(id){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = { 
        method: HTTP.get,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    }

    let response = await fetch(currentRoute + `/product/${id}`, request).then(response => response.json());
    return response;

}

async function findAllProduct(){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = { 
        method: HTTP.get,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    }

    let response = await fetch(currentRoute + `/products`, request).then(response => response.json());
    return response;

}

async function deleteProduct(id){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.delete,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    }

    let response = await fetch(currentRoute + `/product/delete/${id}`, request).then(response => response.json());
    return response;
}

async function updateProduct(id, product){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.put,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
    }

    let response = await fetch(currentRoute + `/product/update/${id}`, request).then(response => response.json());
    return response;
}

async function updateProductName(id, product){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
    }

    let response = await fetch(currentRoute + `/product/name/${id}`, request).then(response => response.json());
    return response;
}

async function updateProductDescription(id, product){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
    }

    let response = await fetch(currentRoute + `/product/description/${id}`, request).then(response => response.json());
    return response;
}

async function updateProductColor(id, product){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
    }

    let response = await fetch(currentRoute + `/product/color/${id}`, request).then(response => response.json());
    return response;
}

async function updateProductPrice(id, product){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
    }

    let response = await fetch(currentRoute + `/product/price/${id}`, request).then(response => response.json());
    return response;
}

async function updateProductLength(id, product){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
    }

    let response = await fetch(currentRoute + `/product/length/${id}`, request).then(response => response.json());
    return response;
}

async function updateProductScale(id, product){
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const request = {
        method: HTTP.patch,
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(product)
    }

    let response = await fetch(currentRoute + `/product/scale/${id}`, request).then(response => response.json());
    return response;
}

module.exports = { 
    createProduct, 
    findProductById,
    findAllProduct,
    updateProduct,
    deleteProduct,
    updateProductColor,
    updateProductDescription,
    updateProductLength,
    updateProductName,
    updateProductPrice,
    updateProductScale
} 