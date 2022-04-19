// document.querySelectorAll('a').forEach(link => {
    if (!link.hash) return;

    link.addEventListener('click', (e) => {
        e.preventDefault();

        const element = document.querySelector(link.hash);
        const position = element.getBoundingClientRect().top - 100;
        window.scrollTo({top: position});
    })
});
// const accordion = document.getElementsByClassName('accordion__box');

console.log(accordion);

for (i = 0; i<accordion.length; i++ ){
    accordion[i].addEventListener('click', function(){
        console.log('accordion');
        this.classList.toggle('accordion__box--active')
    })
};
// const yItemOffset = 70;
const xItemOffset = 70;

const yPercentOffset = 54;
const xPercentOffset = 43;

document.querySelectorAll(".carousel__slide-container").forEach(carousel => {
  const items = carousel.querySelectorAll(".carousel__item");
  const buttonsHTML = Array.from(items, (item) => {
      return `<div class="carousel__button-box">
            <p>${item.dataset.name}</p>
            <span class="carousel__button"></span>
      </div>
      `;
  });

  carousel.insertAdjacentHTML("beforeend", `
    <div class="carousel__nav-container">
      <div class="carousel__nav">
          ${buttonsHTML.join("")}
      </div>
    </div>
  `);

  const carouselNav = carousel.querySelector('.carousel__nav');
  const buttons = carousel.querySelectorAll(".carousel__button-box");
  
  buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
          //unselect all the items
          items.forEach(item => item.classList.remove("carousel__item--selected"));
          buttons.forEach(button => button.classList.remove("carousel__button-box--selected"));
          
          items[i].classList.add("carousel__item--selected");
          button.classList.add("carousel__button-box--selected");

          if (navOrientation === 'vertical') {
              carouselNav.style.transform = `translate(0, calc(${yPercentOffset}% - ${i * yItemOffset}px))`;
          } else {
            carouselNav.style.transform = `translate(calc(${xPercentOffset}% - ${i * xItemOffset}px), 0)`;
          }
          
      })
  })

  items[0].classList.add("carousel__item--selected");
  buttons[0].classList.add("carousel__button-box--selected");

  let navOrientation;

  const updateOrientation = () => {
    if (window.innerWidth > 1024) {
        if (navOrientation !== 'vertical') {
            navOrientation = 'vertical';

            const index = [...buttons].findIndex(element => {
                return element.classList.contains('carousel__button-box--selected')
            })

            carouselNav.style.transform = `translate(0%, calc(${yPercentOffset}% - ${index * yItemOffset}px)`;
        }
    } else {
        if (navOrientation !== 'horizontal') {
            navOrientation = 'horizontal';

            const index = [...buttons].findIndex(element => {
                return element.classList.contains('carousel__button-box--selected')
            })

            carouselNav.style.transform = `translate(calc(${xPercentOffset}% - ${index * xItemOffset}px), 0%)`;
        }
    }
}

updateOrientation();

window.addEventListener('resize', updateOrientation);

});
// const navBtn = document.querySelector('.nav__hamburger-btn');

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
// const navSlide = ()=>{
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