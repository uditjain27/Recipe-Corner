import View from './View.js';
import icons from 'url:./../../img/icons.svg';
import {Fraction} from 'fractional';

class RecipeView extends View{
    _parentElement = document.querySelector('.recipe');
    _errorMsg = `No recipe found for your query. Try again`;
    

    renderEventHandler(renderRecipe){
        ['hashchange','load'].forEach(ev=>window.addEventListener(ev,renderRecipe));
    }

    addChangeServingsHandler(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--update-serving');
            if(!btn)    return;
            const {updateTo} = btn.dataset;
            if(+updateTo > 0)
                handler(+updateTo);
        });
    }

    addBookmarkHandler(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--bookmark');
            if(!btn)    return;
            handler();
        });
    }

    _generateHTMLMarkup(){
        return `
        <figure class="recipe__fig">
            <img src="${this._recipeData.imageUrl}" alt="${this._recipeData.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${this._recipeData.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data-minutes">${this._recipeData.cookingTime}</span>
                <span class="recipe__info-text">min</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data-people">${this._recipeData.servings}</span>
                <span class="recipe__info-text">servings</span>
                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--update-serving" data-update-to = ${this._recipeData.servings - 1}>
                        <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                    </button>
                    <button class="btn--tiny btn--update-serving" data-update-to = ${this._recipeData.servings + 1}>
                        <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="recipe__user-generated ${this._recipeData.key ? '' : 'hidden'}">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            <button class="btn--round btn--bookmark">
                <svg>
                    <use href="${icons}#icon-bookmark${this._recipeData.bookmark ? '-fill' : ''}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe Ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this._recipeData.ingredients.map(ing => {
                return `
                <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity? new Fraction(ing.quantity):''}</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                    </div>
                </li>`;
            }).join('')}
            </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe is carefully designed and tested by
                <span class="recipe__publisher">${this._recipeData.publisher}</span>
                . Please check out directions at their website.
            </p>
            <a class="btn--small recipe__btn" href="${this._recipeData.sourceUrl}" target="_blank">
                <span>Directions</span>
                <svg>
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
        </div>
        `;
    }

};

export default new RecipeView();