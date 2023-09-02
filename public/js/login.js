document.getElementById('loginForm').addEventListener('submit', async (e)=>{
    e.preventDefault()

    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const userCredentials = {username, password}
    const options =  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    }
    
    const notifybox = document.getElementById("notifybox")
    const notifyboxText = document.getElementById("notifyboxText")
    const iconHolder = document.getElementById('icon_holder')
    
    const response = await fetch('/loginUser', options)
    const resJson = await response.json()
    console.log(resJson)
    switch(resJson.status){
        case 'user_valid':
            sessionStorage.setItem('Freelet ID', resJson.freeletId)

            const iconAtValid = document.createElement('i')
            iconAtValid.className = 'fa-solid fa-circle-check xicon'
            iconAtValid.style.color = '#ffffff'
            notifybox.style.display = 'flex'
            notifybox.style.justifyContent = 'center'
            notifybox.style.backgroundColor = 'rgb(2, 143, 0)'
            notifyboxText.innerHTML = 'Sikeres bejelentkezés!';
            iconHolder.appendChild(iconAtValid)


            setTimeout(() => {
                notifybox.style.display = 'none'
                location.href = '/home'
            }, 1000);

            break
        case 'user_not_valid':
            
        const iconAtNotValid = document.createElement('i')
        iconAtNotValid.className = 'fa-solid fa-circle-xmark xicon'
        iconAtNotValid.style.color = '#ffffff'
        notifybox.style.display = 'flex'
        notifybox.style.justifyContent = 'center'
        notifyboxText.innerHTML = 'Hibás jelszó!';
        iconHolder.appendChild(iconAtNotValid)
           
            setTimeout(() => {
                notifybox.style.display = 'none'
            }, 2000);

            break
        case 'user_not_exist':
          
        const iconAtNotExist = document.createElement('i')
        iconAtNotExist.className = 'fa-solid fa-circle-xmark xicon'
        iconAtNotExist.style.color = '#ffffff'
        notifybox.style.display = 'flex'
        notifybox.style.justifyContent = 'center'
        notifyboxText.innerHTML = 'A felhasználó nem létezik!';
        iconHolder.appendChild(iconAtNotExist)

            setTimeout(() => {
                notifybox.style.display = 'none'
            }, 2000);

            break
    }

    //console.log(resJson)
})