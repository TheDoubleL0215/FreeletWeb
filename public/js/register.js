document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    const FreeletID = ''; //Backendben kerül létrehozva
    const user = {FreeletID, username, password}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }

    const response = await fetch('/checkIfUserExist', options)
    const resJson = await response.json()
    console.log(resJson)



    async function notifyUser(){
        if(resJson.exist == true){
            console.log('Ez itt true')
            const notifyboxDiv = document.createElement("div")
            notifyboxDiv.classList.add('notifybox')
            notifyboxDiv.style.display = 'block';
            const notifyboxText = document.createElement("p");
            notifyboxText.innerHTML = 'A felhasználónév már létezik kérlek válassz egy másikat';
            notifyboxDiv.appendChild(notifyboxText)
            document.getElementById("registerForm").appendChild(notifyboxDiv)

            setTimeout(() => {
                notifyboxDiv.remove()
            }, 3000);

        }else{
            console.log('Ez itt false')
            const notifyboxDiv = document.createElement("div")
            notifyboxDiv.classList.add('notifybox')
            notifyboxDiv.style.display = 'block';
            notifyboxDiv.style.border = 'solid 2px rgb(64, 251, 101)'
            const notifyboxText = document.createElement("p");
            notifyboxText.style.color = 'rgb(64, 251, 101)'
            notifyboxText.innerHTML = 'A felhasználónév sikeresen regisztrálva, átirányítunk a főoldalra! 😎';
            notifyboxDiv.appendChild(notifyboxText)
            document.getElementById("registerForm").appendChild(notifyboxDiv)

            setTimeout(() => {
                notifyboxDiv.remove()
            }, 6000);

            fetch('/userCreateApi', options)
        }

    }
    notifyUser()


});
