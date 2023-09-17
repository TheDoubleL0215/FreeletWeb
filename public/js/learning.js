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
        //counterP.innerHTML = `1/${storedCardTerms.length}`
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
const okText = document.getElementById('okText')
const okTextHolder = document.querySelector('.text_ok')
const buttonHolder = document.getElementById('btn_holder')
const jsConfetti = new JSConfetti()


left_button.addEventListener('click', () => {
    if(cardInner.style.transform === 'rotateX(180deg)'){
        cardInner.style.transition = 'none';
        console.log("Fordítva!!!")
        card_placeholder_wrong.style.transform = 'rotateX(0deg)'
        cardInner.style.transform = 'rotateX(0deg)';
        setTimeout(() => {
            cardInner.style.transition = '300ms';
            cardInner.style.outline = 'solid 5px red';
            cardInner.style.boxShadow = '2px 0px 26px 4px #e41111';
            card_placeholder_wrong.style.display = 'block'
            InitializeTermTextField.style.display = 'none';
            InitializeDefinitionTextField.style.display = 'none';
            cardInner.removeEventListener('click', cardflipper)
        }, 10)
    }else{
        card_placeholder_wrong.style.transition = 'none'
        card_placeholder_wrong.style.transform = 'rotateX(0deg)'
        card_placeholder_wrong.style.transition = 'all 300ms'
        setTimeout(() => {
            cardInner.style.transition = '300ms';
            cardInner.style.outline = 'solid 5px red';
            cardInner.style.boxShadow = '2px 0px 26px 4px #e41111';
            card_placeholder_wrong.style.display = 'block'
            InitializeTermTextField.style.display = 'none';
            InitializeDefinitionTextField.style.display = 'none';
            cardInner.removeEventListener('click', cardflipper)
        }, 10)
    }
    
    setTimeout(() => {
        cardInner.style.transition = 'all 300ms';
        cardInner.addEventListener('click', cardflipper)
        cardInner.style.boxShadow = '2px 0px 26px 4px #00000054';
        cardInner.style.outline = 'none';
        // itt inicializáljuk a következő kártyát
        //const radomizedCardChoice = Math.floor(Math.random() * storedCardTerms.length);
        let currentNumber = null;
        let previousNumber = null;
        let notSame = true
        while (currentNumber === previousNumber) {
            currentNumber = Math.floor(Math.random() * storedCardTerms.length);
        }
        console.log('Jelenlegi szám', currentNumber)
        InitializeTermTextField.innerHTML = storedCardTerms[currentNumber]
        InitializeDefinitionTextField.innerHTML = storedCardDefinitions[currentNumber]
        previousNumber = currentNumber;
        console.log("Előző: ", previousNumber)
        //
        InitializeTermTextField.style.display = 'block';
        InitializeDefinitionTextField.style.display = 'block';
        card_placeholder_wrong.style.display = 'none'
    }, 1000);

});

right_button.addEventListener('click', () => {
    let indexOfCuurentTerm = storedCardTerms.indexOf(InitializeTermTextField.innerHTML)
    let indexOfCuurentDefinition = storedCardDefinitions.indexOf(InitializeDefinitionTextField.innerHTML)
    console.log('RemainTerms', storedCardTerms, 'RemainDefinitions', storedCardDefinitions)
    storedCardTerms.splice(indexOfCuurentTerm, 1)
    storedCardDefinitions.splice(indexOfCuurentDefinition, 1)
    
    if(cardInner.style.transform === 'rotateX(180deg)'){
        cardInner.style.transition = 'none';
        console.log("Fordítva!!!")
        card_placeholder_ok.style.transform = 'rotateX(0deg)'
        cardInner.style.transform = 'rotateX(0deg)';
        setTimeout(() => {
            cardInner.style.transition = '300ms';
            cardInner.style.outline = 'solid 5px #1be600';
            cardInner.style.boxShadow = '2px 0px 26px 4px #1be600';
            card_placeholder_ok.style.display = 'block'
            InitializeTermTextField.style.display = 'none';
            InitializeDefinitionTextField.style.display = 'none';
            cardInner.removeEventListener('click', cardflipper)
        }, 10)
    }else{
        card_placeholder_ok.style.transition = 'none'
        card_placeholder_ok.style.transform = 'rotateX(0deg)'
        card_placeholder_ok.style.transition = 'all 300ms'
        setTimeout(() => {
            cardInner.style.transition = '300ms';
            cardInner.style.outline = 'solid 5px #1be600';
            cardInner.style.boxShadow = '2px 0px 26px 4px #1be600';
            card_placeholder_ok.style.display = 'block'
            InitializeTermTextField.style.display = 'none';
            InitializeDefinitionTextField.style.display = 'none';
            cardInner.removeEventListener('click', cardflipper)
        }, 10)
    }
    
    setTimeout(() => {
        if (storedCardTerms.length === 0){
            okTextHolder.style.display = 'flex'
            okTextHolder.style.textAlign = 'center'
            okText.style.fontWeight = '900'
            card_placeholder_ok.style.fontSize = '66px'
            okText.innerHTML = 'És meg is tanultad!'
            buttonHolder.style.display = 'none'
            jsConfetti.addConfetti({
                confettiRadius: 6,
                confettiNumber: 500,
            })
            cardInner.removeEventListener('click', cardflipper)

        }else{
            cardInner.style.transition = 'all 300ms';
            cardInner.addEventListener('click', cardflipper)
            cardInner.style.boxShadow = '2px 0px 26px 4px #00000054';
            cardInner.style.outline = 'none';
            // itt inicializáljuk a következő kártyát
            const radomizedCardChoice = Math.floor(Math.random() * storedCardTerms.length);
            InitializeTermTextField.innerHTML = storedCardTerms[radomizedCardChoice]
            InitializeDefinitionTextField.innerHTML = storedCardDefinitions[radomizedCardChoice]
            //
            InitializeTermTextField.style.display = 'block';
            InitializeDefinitionTextField.style.display = 'block';
            card_placeholder_ok.style.display = 'none'
        }
    }, 1000);
    
});

function cardflipper(){
    cardInner.style.transform = cardInner.style.transform === 'rotateX(180deg)' ? 'rotateX(0deg)' : 'rotateX(180deg)';
}
cardInner.addEventListener('click', cardflipper)