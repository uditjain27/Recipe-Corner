import icons from 'url:./../../img/icons.svg';
import View from './View.js';

class AddNewRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
    _closeModalBtn = document.querySelector('.btn--close-modal');
    _overlay = document.querySelector('.overlay');
    _upload = this._parentElement.querySelector('.upload__btn');
    _errorMsg = `Data is not in the correct format. Please fill the data in the correct format as described.`;
    _Msg = `Your Recipe has been successfully upload.
    Redirecting.....`;

    constructor(){
        super();
        this.addHandlerShowWindow();
        this.addHandlerCloseWindow();
    }

    toggleWindow(rerender = false){
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    addHandlerShowWindow(){
        this._addRecipeBtn.addEventListener('click', () => {
            this.toggleWindow();
            this.render({});
        });
    }

    addHandlerCloseWindow(){
        this._closeModalBtn.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUploadRecipe(handler){
        this._parentElement.addEventListener('submit',function(e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            handler(dataArr);
        });
    }

    renderSuccessMsg(message = this._Msg){
        this._clear();
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-success"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin' , markup);
    }

    _generateHTMLMarkup(){
        return `
            <div class="upload__column">
                <h3 class="upload__heading">Recipe data</h3>
                <label>Title</label>
                <input name="title" type="text" required>
                <label>URL</label>
                <input name="url" type="text" required>
                <label>Image URL</label>
                <input name="imgurl" type="text" required>
                <label>Publisher</label>
                <input name="publisher" type="text" required>
                <label>Prep time</label>
                <input name="preptime" type="number" required>
                <label>Servings</label>
                <input name="serving" type="number" required>
            </div>

            <div class="upload__column">
                <h3 class="upload__heading">Ingredients</h3>
                <label>Ingredient 1</label>
                <input name="ingredient1" type="text" required placeholder="Format : Quantity, Unit, Description">
                <label>Ingredient 2</label>
                <input name="ingredient2" type="text" required placeholder="Format : Quantity, Unit, Description">
                <label>Ingredient 3</label>
                <input name="ingredient3" type="text" required placeholder="Format : Quantity, Unit, Description">
                <label>Ingredient 4</label>
                <input name="ingredient4" type="text" placeholder="Format : Quantity, Unit, Description">
                <label>Ingredient 5</label>
                <input name="ingredient5" type="text" placeholder="Format : Quantity, Unit, Description">
                <label>Ingredient 6</label>
                <input name="ingredient6" type="text" placeholder="Format : Quantity, Unit, Description">
            </div>

            <button class="btn upload__btn">
                <svg>
                    <use href="${icons}#icon-upload-cloud"></use>
                </svg>
                <span>Uplaod</span>
            </button>
        `;
    }
};

export default new AddNewRecipeView();