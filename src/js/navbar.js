(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const hamburger = document.querySelector('.main-nav__hamburger');
    const blockMenu = document.querySelector('.main-nav__list');

    const panel = (mediaQuery) => {
        if (mediaQuery.matches) {
            blockMenu.classList.remove('active')
            hamburger.classList.remove('active');
            hamburger.querySelectorAll('span').forEach((item) => {
                item.classList.remove('active')
            })
        }
    }

    hamburger.addEventListener('click', () => {
        blockMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.querySelectorAll('span').forEach((item) => {
            item.classList.toggle('active')
        })
    })

    window.addEventListener('resize', () => {
        panel(mediaQuery)
    });
})()