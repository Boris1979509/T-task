(() => {
    const toCurrency = price => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        }).format(price)
    }
    document.querySelectorAll('.number-format')
        .forEach(node => {
            node.textContent = toCurrency(node.textContent)
        })
})()