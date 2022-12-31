function snackbar(color, message){
    let snackbar = document.getElementById("snackbar");
    snackbar.style.background = color;
    snackbar.textContent = message;
    snackbar.className = 'show'
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

module.exports = { snackbar }
    