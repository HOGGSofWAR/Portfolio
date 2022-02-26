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
})