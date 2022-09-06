
programarBotonLogin()

function programarBotonLogin() {
    const btn = document.getElementById("btnLogin")
    btn.addEventListener("click", () => {
        procesarLogin();
    })
}

function procesarLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Completa todos los datos")
    }
    else {
        if (username === "admin1" && password === "admin1") {
            alert("Credenciales Correctas")
            mostrarBackoffice();
        }
        else {
            alert("Password Inválido")
        }
    }
}

function mostrarBackoffice()
{
   window.location.href='./JS/crud/backoffice.html';

}