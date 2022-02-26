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

navSlide();