ready(() => {

    document.querySelector('.footer__block-button a').addEventListener('click', e => {
        e.preventDefault();
        new Modal({
            title: 'SEND US MESSAGE',
            width: 750,
            idForm: 'form'
        });
    });

});
