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

    const response = await fetch('/loginUser', options)
    const resJson = await response.json()
    switch(resJson.status){
        case 'user_valid':
            sessionStorage.setItem('Freelet ID', resJson.freeletId)

            const notifyboxDiv = document.createElement("div")
            notifyboxDiv.classList.add('notifybox')
            notifyboxDiv.style.display = 'block';
            notifyboxDiv.style.border = 'solid 2px rgb(64, 251, 101)'
            const notifyboxText = document.createElement("p");
            notifyboxText.style.color = 'rgb(64, 251, 101)'
            notifyboxText.innerHTML = 'Sikeres bejelentkezés, átleszel iránytva a főoldalra';
            notifyboxDiv.appendChild(notifyboxText)
            document.getElementById("loginForm").appendChild(notifyboxDiv)

            location.href = '/home'

            break
        case 'user_not_valid':
            const notifyboxInvalidPasswordDiv = document.createElement("div")
            notifyboxInvalidPasswordDiv.classList.add('notifybox')
            notifyboxInvalidPasswordDiv.style.display = 'block';
            notifyboxInvalidPasswordDiv.style.border = 'solid 2px red'
            const notifyboxInvalidPasswordText = document.createElement("p");
            notifyboxInvalidPasswordText.style.color = 'red'
            notifyboxInvalidPasswordText.innerHTML = 'Helytelen jelszó, próbáld meg újra!';
            notifyboxInvalidPasswordDiv.appendChild(notifyboxInvalidPasswordText)
            document.getElementById("loginForm").appendChild(notifyboxInvalidPasswordDiv)

            setTimeout(() => {
                notifyboxInvalidPasswordDiv.remove()
            }, 3000);

            break
        case 'user_not_exist':
            const notifyboxUserNotExistDiv = document.createElement("div")
            notifyboxUserNotExistDiv.classList.add('notifybox')
            notifyboxUserNotExistDiv.style.display = 'block';
            notifyboxUserNotExistDiv.style.border = 'solid 2px red'
            const notifyboxUserNotExistText = document.createElement("p");
            notifyboxUserNotExistText.style.color = 'red'
            notifyboxUserNotExistText.innerHTML = 'A felhasználó nem létezik';
            notifyboxUserNotExistDiv.appendChild(notifyboxUserNotExistText)
            document.getElementById("loginForm").appendChild(notifyboxUserNotExistDiv)



            break
    }

    //console.log(resJson)
})