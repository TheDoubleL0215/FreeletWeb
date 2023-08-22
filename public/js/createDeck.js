//Card elemei
let orderNumber = 1


function cardCreation(){
    orderNumber += 1;
    const card_container_div = document.createElement('div')
    card_container_div.classList.add('card_container_div')  //main
    const order_number_div = document.createElement('div')
    order_number_div.classList.add('order_number_div') 
    const order_number_p = document.createElement('p')
    order_number_p.classList.add('order_number_p')
    const card = document.createElement('div')
    card.classList.add('card')
    const new_term_div = document.createElement('div')
    new_term_div.classList.add('new_term_div')
    const new_term_input = document.createElement('input')
    new_term_input.classList.add('new_term_input')
    new_term_input.setAttribute("name", "new_term_input")
    new_term_input.required = true;
    const new_term_p = document.createElement('p')
    new_term_p.classList.add('new_term_p')
    const new_definition_div = document.createElement('div')
    new_definition_div.classList.add('new_definition_div')
    const new_definition_input = document.createElement('input')
    new_definition_input.setAttribute("name", "new_definition_input")
    new_definition_input.required = true;
    new_definition_input.classList.add('new_definition_input')
    const new_definition_p = document.createElement('p')
    new_definition_p.classList.add('new_definition_p')
    //Card properties
    new_term_p.innerHTML = 'Fogalom'
    new_definition_p.innerHTML = 'Definíció'
    order_number_p.innerHTML = orderNumber
    //hozzárendelések

    card_container_div.appendChild(card)
    card.appendChild(order_number_div)
    order_number_div.appendChild(order_number_p)

    new_term_div.appendChild(new_term_input)
    new_term_div.appendChild(new_term_p)
    card.appendChild(new_term_div)
    
    new_definition_div.appendChild(new_definition_input)
    new_definition_div.appendChild(new_definition_p)
    card.appendChild(new_definition_div)
 
    document.getElementById("cards_container_div").appendChild(card_container_div)
}


const myDiv = document.getElementById('new_btn_card');

myDiv.addEventListener('click', (e) => {
    e.preventDefault()
    cardCreation()
});

document.getElementById('saving_btn').addEventListener('click', async(e) => {
    e.preventDefault()
    const new_term_input_getElement = document.getElementsByName("new_term_input")
    const new_definition_input_getElement = document.getElementsByName("new_definition_input")
    if(new_term_input_getElement === '' || new_definition_input_getElement ===''){
        alert('Az egyik mező nincs kitöltve')
    }else{
        var newTermsList = new Array()
        var newDefinitionsList = new Array()
        if (new_term_input_getElement.length != new_definition_input_getElement.length){
            console.log(`A kettő elem nem egyenlő! ${new_term_input_getElement.length}, ${new_definition_input_getElement.length}`)
        }else{
            for(var i = 0; i < new_term_input_getElement.length; i++){
                newTermsList.push(new_term_input_getElement[i].value)
            }
            for(var i = 0; i < new_definition_input_getElement.length; i++){
                newDefinitionsList.push(new_definition_input_getElement[i].value)
            }
            console.log(`Ez a term: ${newTermsList}, \n és ez a definition: ${newDefinitionsList}`)
    
            const datapack = {
                terms: newTermsList,
                definitions: newDefinitionsList
            }
    
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datapack)
            }
    
            fetch('/createNewDeck', options)
    }
    }
    
})


