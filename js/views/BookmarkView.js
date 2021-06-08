import icons from 'url:./../../img/icons.svg';
import View from './View.js';

class BookmarkView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMsg = `No bookmark yet. Find a nice recipe and bookmark it.`;

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
                                <use href="${icons}#icon-user"> </use> 
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
            `
        ).join('');
    }

};

export default new BookmarkView();