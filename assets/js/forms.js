ready(() => {

    window.Forms = function() {
        this.init = function() {
            this.handlerEmail();
            this.handlerSubmit();
        }
        this.handlerEmail = function() {
            document.querySelector('.modal__content [name="email"]').addEventListener("input", e => {
                this.validateEmail(e.currentTarget);
            });
        }
        this.validateEmail = function(email) {
            if (email.value.toLowerCase().match(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i)) {
                document.querySelector('.modal__content .form-submit').removeAttribute('disabled');
                this.removeError(email);
            } else {
                document.querySelector('.modal__content .form-submit').setAttribute('disabled', 'disabled');
                this.insertError(email);
            }
        }
        this.handlerSubmit = function() {
            let _this = this;
            let email = document.querySelector('.modal__content [name="email"]');
            function serializeForm(form) {
                return new FormData(form);
            }
            async function handleFormSubmit(event) {
                event.preventDefault()
                _this.validateEmail(email);
                if (email.value.toLowerCase().match(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i)) {
                    const data = serializeForm(event.target)
                    const { status, error } = await sendData(data);
                    if (status === 200) {
                        onSuccess(event.target);
                    }
                }
            }
            async function sendData(data) {
                return await fetch('/api/form/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    body: data,
                })
            }
            function onSuccess(form) {
                form.innerHTML = '';
                form.insertAdjacentHTML('beforeend', `<div>Your message successfully sent</div>`);
            }
            const applicantForm = document.querySelector('.modal__content form');
            applicantForm.addEventListener('submit', handleFormSubmit);
        }
        this.insertError = function(item) {
            if (!item.parentNode.querySelector('div.error')) {
                item.classList.add('error');
                if (item.value === '') {
                    item.parentNode.insertAdjacentHTML('beforeend', `<div class="error">Это поле необходимо заполнить</div>`);
                } else {
                    item.parentNode.insertAdjacentHTML('beforeend', `<div class="error">Введен некорректный email адрес</div>`)
                }
            }
        }
        this.removeError = function(item) {
            if (item.parentNode.querySelector('div.error')) {
                item.parentNode.querySelector('div.error').remove();
                item.classList.remove('error');
            }
        }

        this.init();
    }

});
