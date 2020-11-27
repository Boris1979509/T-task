(() => {
    // The button
    const btnTop = document.querySelector('#scrollTop');
    // Reveal the button
    const btnReveal = () => {
        if (window.scrollY >= 1000)
            btnTop.classList.add('is-visible');
        else
            btnTop.classList.remove('is-visible');
    }

    // Smooth scroll top
    const topScrollTo = () => {
        if (window.scrollY !== 0) {
            setTimeout(() => {
                window.scrollTo(0, window.scrollY - 10);
                topScrollTo();
            });
        }
    }
    // Listeners
    window.addEventListener('scroll', btnReveal);
    btnTop.addEventListener('click', topScrollTo);
})()