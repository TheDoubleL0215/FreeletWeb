if(sessionStorage.getItem('Open DB') === null){
    location.href = '/home'
}

document.getElementById('displayDb').innerHTML = sessionStorage.getItem('Open DB')
document.getElementById('flashcard_btn_container').addEventListener('click', function(){
    location.href = '/flash'
})