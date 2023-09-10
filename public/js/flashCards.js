if(sessionStorage.getItem('Open DB') === null){
    location.href = '/home'
}

const storedCardTerms = new Array()
const storedCardDefinitions = new Array()


async function getRecordsOfDb(){
    const felhasznalo = sessionStorage.getItem('User')
    const nyitottDb = sessionStorage.getItem('Open DB')
    const datapack = {felhasznalonev: felhasznalo, nyitottAdatBazis: nyitottDb}
    console.log('Datapackk: ', datapack)
    const requestToBack = await fetch("/getRecordsOfDb", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datapack)
    })
    if(requestToBack.ok){
        const recieveCards = await requestToBack.json();
        console.log({Terms: recieveCards.terms, Definitions: recieveCards.definitions})
        for(let i = 0; i < recieveCards.terms.length; i++){
            storedCardTerms.push(recieveCards.terms[i])
            storedCardDefinitions.push(recieveCards.definitions[i])
        }
        console.log("storedCardTerms: ", storedCardTerms)
        console.log("storedCardDefinitions: ", storedCardDefinitions)
        InitializeTermTextField.innerHTML = storedCardTerms[0]
        InitializeDefinitionTextField.innerHTML = storedCardDefinitions[0]
    }
}
getRecordsOfDb()


const card = document.querySelector('.card_conatiner');
const cardInner = document.querySelector('.card_self');
const InitializeTermTextField = document.getElementById('termText')
const InitializeDefinitionTextField = document.getElementById('defText')

cardInner.addEventListener('click', function() {
    cardInner.style.transform = cardInner.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
});

console.log("storedCardTerms outside: ", storedCardTerms)
console.log("storedCardDefinitions outside: ", storedCardDefinitions)
