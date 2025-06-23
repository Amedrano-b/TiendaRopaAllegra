const wrapper = document.querySelector(".wrapper");
const loginLink= document.querySelector(".login-link");
const registerLink= document.querySelector(".register-link");
const btnPopup= document.querySelector(".btnLogin-popup");
const iconClose= document.querySelector(".icon-close");

registerLink.addEventListener("click", ()=>{
    wrapper.classList.add("active");
})

loginLink.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
})

btnPopup.addEventListener("click", ()=>{
    wrapper.classList.add("active-popup");
})

iconClose.addEventListener("click", ()=>{
    wrapper.classList.remove("active-popup");
})


const formLogin = document.querySelector("#formLogin");

btnLogin.addEventListener('click', event =>{
    event.preventDefault();
    if(email.value == "" || password.value == ""){
        alert("Completa todos los campos");
        return false
    }
    const form = new FormData(formLogin);
    form.append("function", "login");
    fetch("asset/data/Users.php", {
        method: "POST",
        body: form
    })
})

