if(sessionStorage.getItem('Freelet ID') === null){
    location.href = '/login'
}else{
    let theMainCharacter
    getCurrentUserUsername()
    async function getCurrentUserUsername(){
        freeletid = sessionStorage.getItem('Freelet ID')
        const sendMessage = {freeletid}
        const response = await fetch("/getCurrentUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendMessage)
        })
        if (response.ok) {
            const data = await response.json();
            console.log("Received name:", data.userName);
            theMainCharacter = data.userName
            getAllDbsName()
        } else {
            console.error("Failed to fetch database names");
        }
    }
    async function getAllDbsName(){
        const response = await fetch("/listDecks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json();
            const resDbs = data.databaseNames
            console.log("Received database names:", resDbs);
            const newDatabaseArray = [...resDbs];
            console.log('Ez a tömb,', newDatabaseArray)
            const searchValue = theMainCharacter
            const foundElement = newDatabaseArray.filter(item => item.includes(searchValue))
            console.log('Ez a find element: ', foundElement)
            if(foundElement.length === 0){
                //console.log('Nincs talált pakli')
                document.getElementById('nothing_found_div').style.display = 'flex'
            }else{
                foundElement.forEach(elem => {
                    const splittedName = elem.split("_")
                    const realItem = splittedName[1]
                    const nameHolderDiv = document.createElement('div')
                    nameHolderDiv.classList.add('item')
                    const nameHolderP = document.createElement('p')
                    nameHolderP.classList.add('item_p')
                    nameHolderP.innerHTML = realItem
                    nameHolderDiv.appendChild(nameHolderP)
                    nameHolderDiv.addEventListener('click', function() {
                        sessionStorage.setItem("Open DB", nameHolderP.innerHTML)
                        location.href = '/learn'
                    })
                    document.getElementById('decks_main_container').appendChild(nameHolderDiv)
                })
            }
            console.log('Lécci:? ', foundElement)
        } else {
            console.error("Failed to fetch database names");
        }
    }
}




const logoutButton = document.getElementById("logout_btn")

logoutButton.addEventListener("click", (e) => {
    sessionStorage.removeItem('Freelet ID')
    location.reload()
})