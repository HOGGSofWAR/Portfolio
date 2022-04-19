// document.querySelectorAll('a').forEach(link => {
//     if (!link.hash) return;

//     link.addEventListener('click', (e) => {
//         e.preventDefault();

//         const element = document.querySelector(link.hash);
//         const position = element.getBoundingClientRect().top - 100;
//         window.scrollTo({top: position});
//     })
// })