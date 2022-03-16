document.querySelectorAll(".carousel__slide-container").forEach(carousel => {
  const items = carousel.querySelectorAll(".carousel__item");
  const buttonsHTML = Array.from(items, () => {
      return `<span class="carousel__button"></span>`;
  });

  carousel.insertAdjacentHTML("beforeend", `
      <div class="carousel__nav">
          ${buttonsHTML.join("")}
      </div>
  `);

  const buttons = carousel.querySelectorAll(".carousel__button");

  buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
          //unselect all the items
          items.forEach(item => item.classList.remove("carousel__item--selected"));
          buttons.forEach(button => button.classList.remove("carousel__button--selected"));

          items[i].classList.add("carousel__item--selected");
          button.classList.add("carousel__button--selected");
      })
  })

  items[0].classList.add("carousel__item--selected");
  buttons[0].classList.add("carousel__button--selected");
});
const accordion = document.getElementsByClassName('accordion__box');

console.log(accordion);

for (i = 0; i<accordion.length; i++ ){
    accordion[i].addEventListener('click', function(){
        console.log('accordion');
        this.classList.toggle('accordion__box--active')
    })
};
const navBtn = document.querySelector('.nav__hamburger-btn');

let navOpen = false;

navBtn.addEventListener('click', () => {
    if(!navOpen) {
        navBtn.classList.add('nav__hamburger-btn--active');
        navOpen = true;
    } else {
        navBtn.classList.remove('nav__hamburger-btn--active');
        navOpen = false;
    }
});
const navSlide = ()=>{
    const burger = document.querySelector('.nav__hamburger-btn');
    const nav = document.querySelector('.nav--mobile');
    const navLinks = nav.querySelectorAll('.nav__menu-items li, .socials, .nav__menu-item-has-children, .nav__sub-menu');

    burger.addEventListener('click', () => {
        //toggle
        nav.classList.toggle('nav--active');

        //slide
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.opacity = 1;
                link.style.animation = '';
            } else {
                link.style.opacity = 0;
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0}s`;         
            }
        });       

    });
}

navSlide();;

console.log('main js');