import icons from 'url:./../../img/icons.svg';

export default class View{
    _parentElement;
    _recipeData;

    render(data){
        if(!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();
        this._recipeData = data;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', this._generateHTMLMarkup());
    }

    update(data){
        this._recipeData = data;
        const updatedMarkup = this._generateHTMLMarkup();

        const newDom = document.createRange().createContextualFragment(updatedMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl , i) => {
            const curEl = curElements[i];
            //Update Text
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '')
                curEl.textContent = newEl.textContent;

            //Update Attributes
            if(!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach(att => curEl.setAttribute(att.name, att.value));
        });
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    buffer(){
        this._clear();
        const htmlBuffer = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin',htmlBuffer);
    }

    renderError(message = this._errorMsg){
        this._clear();
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin' , markup);
    }
}