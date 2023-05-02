ready(() => {

    window.Modal = function(settings) {
        let modal = null;
        let _scrollTop = 0;

        this.init = function() {
            document.body.insertAdjacentHTML('beforeend', this.templateModal());
            modal = document.querySelector('.modal');
            this.insertForm();
            new Forms();
        }
        this.templateModal = function() {
            return `
                <div class="modal">
                    <div class="modal__window">
                        <div class="modal__header">
                            <div class="modal__title">${settings.title}</div>
                            <div class="modal__close">X</div>
                        </div>
                        <div class="modal__content">
                        </div>
                    </div>
                    <div class="modal__overlay"></div>
                </div>
            `
        }
        this.insertForm = function() {
            let cloneForm = document.querySelector(`#${settings.idForm}`).cloneNode(true);
            modal.querySelector('.modal__content').append(cloneForm);
            this.handlerButtonClose();
            this.handlerOverlay();

            function getScrollbarSize() {
                let outer = document.createElement('div');
                outer.style.visibility = 'hidden';
                outer.style.width = '100px';
                outer.style.msOverflowStyle = 'scrollbar';
                document.body.appendChild(outer);
                let widthNoScroll = outer.offsetWidth;
                outer.style.overflow = 'scroll';
                let inner = document.createElement('div');
                inner.style.width = '100%';
                outer.appendChild(inner);
                let widthWithScroll = inner.offsetWidth;
                outer.parentNode.removeChild(outer);
                return widthNoScroll - widthWithScroll;
            }
            document.body.classList.add('no-scroll');
            _scrollTop = window.pageYOffset;
            document.body.style.position = 'fixed';
            if (document.body.scrollHeight > document.body.clientHeight) {
                document.body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
            } else {
                document.body.style.width = '100%';
            }
            document.body.style.top = -_scrollTop + 'px';
        }
        this.destroy = function() {
            if (modal) {
                modal.remove();
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                window.scrollTo({ top: _scrollTop, left: 0, behavior: "instant"});
            }
        }
        this.handlerButtonClose = function() {
            modal.querySelector('.modal__close').addEventListener('click', e => {
                this.destroy();
            });
        }
        this.handlerOverlay = function() {
            modal.querySelector('.modal__overlay').addEventListener('click', e => {
                this.destroy();
            });
        }

        this.init();
    }

});
