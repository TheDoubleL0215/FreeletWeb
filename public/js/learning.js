if(sessionStorage.getItem('Open DB') === null){
    document.getElementById('displayDb').innerHTML = "Database Name"
}else{
    document.getElementById('displayDb').innerHTML = sessionStorage.getItem('Open DB')
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
        counterP.innerHTML = `1/${storedCardTerms.length}`
    }
}
getRecordsOfDb()


const counterP = document.getElementById('counter_p')
const card = document.querySelector('.card_conatiner');
const cardInner = document.querySelector('.card_self');
const InitializeTermTextField = document.getElementById('termText')
const InitializeDefinitionTextField = document.getElementById('defText')
const left_button = document.querySelector('.left_button')
const right_button = document.querySelector('.right_button')
const card_placeholder_ok = document.querySelector('.card_placeholder_ok')
const card_placeholder_wrong = document.querySelector('.card_placeholder_wrong')


left_button.addEventListener('click', () => {
    InitializeTermTextField.style.display = 'none';
    InitializeDefinitionTextField.style.display = 'none';
    cardInner.removeEventListener('click', cardflipper)
    cardInner.style.outline = 'solid 5px red';
    cardInner.style.boxShadow = '2px 0px 26px 4px #e41111';
    card_placeholder_wrong.style.display = 'block'
    setTimeout(() => {
        cardInner.addEventListener('click', cardflipper)
        cardInner.style.boxShadow = '2px 0px 26px 4px #00000054';
        cardInner.style.outline = 'none';
        // itt inicializáljuk a következő kártyát
        InitializeTermTextField.innerHTML = storedCardTerms[0]
        InitializeDefinitionTextField.innerHTML = storedCardDefinitions[0]
        //
        InitializeTermTextField.style.display = 'block';
        InitializeDefinitionTextField.style.display = 'block';
        card_placeholder_wrong.style.display = 'none'
    }, 1000);


    //cardInner.style.transition = 'none';
    //if(cardInner.style.transform = 'rotateX(180deg)'){
    //    cardInner.style.transform = 'rotateX(0deg)'
    //}
    //cardInner.style.transform = 'translateX(-50px)';
    //setTimeout(() => {
    //    cardInner.style.transition = 'all 300ms'
    //    cardInner.style.transform = 'none';
    //    counterP.innerHTML = `${counter + 1}/${storedCardTerms.length}`
    //}, 100);
});

right_button.addEventListener('click', () => {
    InitializeTermTextField.style.display = 'none';
    InitializeDefinitionTextField.style.display = 'none';
    cardInner.removeEventListener('click', cardflipper)
    cardInner.style.outline = 'solid 5px green';
    cardInner.style.boxShadow = '2px 0px 26px 4px #1be600';
    card_placeholder_ok.style.display = 'block'
    setTimeout(() => {
        cardInner.addEventListener('click', cardflipper)
        cardInner.style.boxShadow = '2px 0px 26px 4px #00000054';
        cardInner.style.outline = 'none';
        // itt inicializáljuk a következő kártyát
        InitializeTermTextField.innerHTML = storedCardTerms[0]
        InitializeDefinitionTextField.innerHTML = storedCardDefinitions[0]
        //
        InitializeTermTextField.style.display = 'block';
        InitializeDefinitionTextField.style.display = 'block';
        card_placeholder_ok.style.display = 'none'
    }, 1000);

    //cardInner.style.transition = 'none';
    //if(cardInner.style.transform = 'rotateX(180deg)'){
        //cardInner.style.transform = 'rotateX(0deg)'
    //}
    //cardInner.style.transform = 'translateX(50px)';
    //setTimeout(() => {
        //cardInner.style.transition = 'all 300ms'
        //cardInner.style.transform = 'none';
        //counterP.innerHTML = `${counter + 1}/${storedCardTerms.length}`
    //}, 100);
});

function cardflipper(){
    cardInner.style.transform = cardInner.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
}
cardInner.addEventListener('click', cardflipper)