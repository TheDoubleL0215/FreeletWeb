if(sessionStorage.getItem('Freelet ID') === null){
    location.href = '/login'
}

const logoutButton = document.getElementById("logout_btn")

logoutButton.addEventListener("click", (e) => {
    sessionStorage.removeItem('Freelet ID')
    location.reload()
})