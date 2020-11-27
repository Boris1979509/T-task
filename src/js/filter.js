(() => {
    const reg = /([\s]|[\\,].*)/g
    const cards = document.querySelectorAll('.card')
    const cardContainer = document.querySelector('.card-container')

    const filter = (select, searchTag) => {
        cardContainer.innerHTML = ''
        const filterValue = select.options[select.selectedIndex].value

        if (filterValue !== '') {
            cards.forEach(card => {
                let val = ''
                if (searchTag === 'price') {
                    let price = card.querySelector('.card__price').textContent
                    val = price.replace(reg, '')
                }
                if (searchTag === 'age') {
                    val = card.querySelector('.age').textContent
                }
                if (val === filterValue) {
                    cardContainer.append(card)
                }
            })
        } else {
            cards.forEach(card => {
                cardContainer.append(card)
            })
        }
    }
    /* Select price */
    const selectPrice = document.querySelector('.filters__select-by-price')
    selectPrice.addEventListener('change', () => {
        filter(selectPrice, 'price')
    })
    /* Select age */
    const selectAge = document.querySelector('.filters__select-by-age')
    selectAge.addEventListener('change', () => {
        filter(selectAge, 'age')
    })
})()