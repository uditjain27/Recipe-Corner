import icons from 'url:./../../img/icons.svg';
import View from './View.js';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    _curPage;
    _totalPages;

    addHandlerPageTo(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.pagination__btn');
            if(!btn)    return;

            const goto = btn.dataset.goTo;
            handler(+goto);
        })
    }

    _generateHTMLMarkup(){
        this._curPage = this._recipeData.page;
        this._totalPages = Math.ceil(this._recipeData.data.length / this._recipeData.resultsPerPage);
        // console.log(this._totalPages, this._curPage);
        if(this._curPage === 1 && this._totalPages >1)
            return `${this._generateButtonMarkup('prev', 'hidden')} ${this._generateCenterButtonMarkup()} ${this._generateButtonMarkup('next')}`;
        else if(this._curPage > 1 && this._curPage<this._totalPages)
            return `${this._generateButtonMarkup('prev')} ${this._generateCenterButtonMarkup()} ${this._generateButtonMarkup('next')}`;
        else if(this._curPage === this._totalPages && this._totalPages !== 1)
            return `${this._generateButtonMarkup('prev')}${this._generateCenterButtonMarkup()}`;
        else
            return '';
    }

    /* _generateHTMLMarkup(){
        this._curPage = this._recipeData.page;
        this._totalPages = Math.ceil(this._recipeData.data.length / this._recipeData.resultsPerPage);
        console.log(this._totalPages, this._curPage);
        if(this._curPage === 1 && this._totalPages >1)
            return this._generateButtonMarkup('next');
        else if(this._curPage > 1 && this._curPage<this._totalPages)
            return `${this._generateButtonMarkup('prev')} ${this._generateButtonMarkup('next')}`;
        else if(this._curPage === this._totalPages && this._totalPages !== 1)
            return this._generateButtonMarkup('prev');
        else
            return '';
    } */

    _generateCenterButtonMarkup(){
        return `
            <button class="btn--inline pagination__btn--center">
                <span> Page ${this._curPage} of ${this._totalPages}</span>
            </button>
        `
    }

    _generateButtonMarkup(state, hide = ''){
        return `
            <button class="btn--inline pagination__btn pagination__btn--${state} ${hide}" data-go-to = "${state === 'prev' ? this._curPage-1 : this._curPage+1}">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-${state === 'prev' ? 'left' : 'right'}"></use>
                </svg>
                <span> Page ${state === 'prev' ? this._curPage-1 : this._curPage+1}</span>
            </button>
        `
    }
}

export default new PaginationView();