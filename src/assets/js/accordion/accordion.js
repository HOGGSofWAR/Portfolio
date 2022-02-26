const accordion = document.getElementsByClassName('accordion__box');

console.log(accordion);

for (i = 0; i<accordion.length; i++ ){
    accordion[i].addEventListener('click', function(){
        console.log('accordion');
        this.classList.toggle('accordion__box--active')
    })
}