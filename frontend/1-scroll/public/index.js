const header = document.querySelector('.header-content');

let lastScrollPosition = 0;

document.addEventListener('scroll', () => {
    const { scrollY } = window;
    if (scrollY > lastScrollPosition ) {
        header.classList.add("down");
    } else {
        header.classList.remove("down");
    } 

    lastScrollPosition = scrollY;
});