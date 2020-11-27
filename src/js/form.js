(() => {
    const forms = document.querySelectorAll('form.form')
    if (!forms) return

    const validateEmail = (email) => {
        const response = []
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (email === '') {
            response.push(
                {
                    message: 'Поле обязательно для заполнения.',
                    status: false
                }
            )
            return response
        }

        if (!re.test(String(email).toLowerCase())) {
            response.push(
                {
                    message: 'Не валидный адрес эл. почты.',
                    status: false
                }
            )
        } else {
            response.push(
                {
                    message: 'Подписка успешно оформлена.',
                    status: true
                }
            )
        }
        return response

    }
    const formSubmitHandler = (form) => {
        const messages = document.querySelector('.messages')
        form.onsubmit = async (e) => {
            e.preventDefault();
            let email = form.email.value
            const result = validateEmail(email)
            /**
             * Error
             */
            if (result[0].status === false) {
                messages.innerHTML = `<span class='error'>${result[0].message}</span>`
            }
            /**
             * Success
             */

            if (result[0].status === true) {
                messages.innerHTML = `<span class='success'>${result[0].message}</span>`
            }
            setTimeout(() => {
                messages.innerHTML = ''
            }, 5000)
        }
    }

    forms.forEach(item => formSubmitHandler(item))
})()