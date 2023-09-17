//if(sessionStorage.getItem('Open DB') === null){
    //location.href = '/home'
//}

if(sessionStorage.getItem('Open DB') === null){
    document.getElementById('displayDb').innerHTML = "Database Name"
}else{
    document.getElementById('displayDb').innerHTML = sessionStorage.getItem('Open DB')
}
let counter = 0


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
        counterP.innerHTML = `1/${storedCardTerms.length}`
    }
}
getRecordsOfDb()


const counterP = document.getElementById('counter_p')
const card = document.querySelector('.card_conatiner');
const cardInner = document.querySelector('.card_self');
const InitializeTermTextField = document.getElementById('termText')
const InitializeDefinitionTextField = document.getElementById('defText')

cardInner.addEventListener('click', function() {
    cardInner.style.transform = cardInner.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
});

document.getElementById('left_button').addEventListener('click', function() {
    cardInner.style.transition = 'none';

    if(cardInner.style.transform = 'rotateX(180deg)'){
        cardInner.style.transform = 'rotateX(0deg)'
    }

    counter -= 1
    if(counter < 0){
        counter = storedCardDefinitions.length - 1
    }
    console.log("Számláló: ", counter)

    cardInner.style.transform = 'translateX(-50px)';
    InitializeTermTextField.innerHTML = storedCardTerms[counter]
    InitializeDefinitionTextField.innerHTML = storedCardDefinitions[counter]

    setTimeout(() => {
        cardInner.style.transition = 'all 300ms'
        cardInner.style.transform = 'none';
        counterP.innerHTML = `${counter + 1}/${storedCardTerms.length}`
    }, 100);
})

document.getElementById('right_button').addEventListener('click', function() {
    cardInner.style.transition = 'none';

    if(cardInner.style.transform = 'rotateX(180deg)'){
        cardInner.style.transform = 'rotateX(0deg)'
    }
    counter += 1
    if(counter >= storedCardTerms.length){
        counter = 0
    }

    cardInner.style.transform = 'translateX(50px)';

    InitializeTermTextField.innerHTML = storedCardTerms[counter]
    InitializeDefinitionTextField.innerHTML = storedCardDefinitions[counter]


    setTimeout(() => {
        cardInner.style.transition = 'all 300ms'
        cardInner.style.transform = 'none';
        counterP.innerHTML = `${counter + 1}/${storedCardTerms.length}`
    }, 100);
})

function cardForward(){
    counter += 1
}

console.log("storedCardTerms outside: ", storedCardTerms)
console.log("storedCardDefinitions outside: ", storedCardDefinitions)