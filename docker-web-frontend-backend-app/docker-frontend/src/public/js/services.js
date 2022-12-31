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
    return response
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

    let response = await fetch(currentRoute + `/product/${id}`).then(response => response.json());
    return response;

}

module.exports = { createProduct, findProductById } 