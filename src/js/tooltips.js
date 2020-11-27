(() => {
    const tooltips = {
        icons: null,
        init: () => {
            tooltips.icons = document.querySelectorAll(".tooltip-icon")
            if (!tooltips.icons)
                return
            tooltips.icons.forEach(element => {
                if (element.classList.contains('active')) {
                    element.setAttribute('data-title', 'Убрать из избранного')
                } else {
                    element.setAttribute('data-title', 'Добавить в избранное')
                }
                element.onclick = function () {
                    tooltips.switch(this);
                };
            })
        },
        switch: (element) => {
            element.classList.toggle('active');
            tooltips.init()
        }
    }
    tooltips.init()
})()