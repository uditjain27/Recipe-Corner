import icons from 'url:./../../img/icons.svg';
import { state } from '../model.js';
import View from './View.js';

class SearchView extends View{
    _parentEleForm = document.querySelector('.search');
    _parentElement = document.querySelector('.results');
    _errorMsg = `No recipe found for your query. Try again`;

    getQuery(){
        const data = this._parentEleForm.querySelector(".search__field").value.toString();
        this._clearInput();
        return data; 
    }

    _clearInput(){
        this._parentEleForm.querySelector('.search__field').value = '';
        this._parentEleForm.querySelector('.search__field').blur();
    }

    addHandlerSearch(renderSearchResults){
        this._parentEleForm.addEventListener('submit',(e)=>{
            e.preventDefault();
            renderSearchResults();
        });
    }

    _generateHTMLMarkup(){
        const id = window.location.hash.slice(1);
        
        return this._recipeData.map(rec => 
            `
            <li class="preview">
                <a class="preview__link ${rec.id === id ? 'preview__link--active' : ''}" href="#${rec.id}">
                    <figure class="preview__fig">
                        <img src="${rec.imageUrl}" alt="${rec.title}">
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${rec.title}</h4>
                        <p class="preview__publisher">${rec.publisher}</p>
                        <div class="preview__user-generated ${rec.key ? '' : 'hidden'}">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
            `
        ).join('');
    }

};

export default new SearchView();