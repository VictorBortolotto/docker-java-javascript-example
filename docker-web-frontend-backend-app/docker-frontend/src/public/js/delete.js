async function onClickDeleteProduct(){
    let buttonExitQueryMode = document.getElementById("exit")
    let id = document.getElementById("id").value;

    let response = await deleteProduct(id);

    if(response.statusCode == 200){
        snackbar('green', response.message);
        buttonExitQueryMode.click();
    }else{
        snackbar('orange', response.message);
        return;
    }
}