//https://forkify-api.herokuapp.com/api/get?rId=47746

import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import SearchView from './views/SearchView.js';
import BookmarkView from './views/BookmarkView.js';
import AddNewRecipeView from './views/AddNewRecipeView.js';
import PaginationView from './views/PaginationView.js';
import { async } from 'regenerator-runtime';
import { CLOSE_MODAL_TIME_OUT } from './config.js';

const renderRecipe = async function(){
    try{
        const url = window.location.hash.slice(1);
        if(!url) return;
        SearchView.update(model.createResultsPerPage(model.state.search.page));
        BookmarkView.update(model.state.bookmarked);
        RecipeView.buffer();
        await model.generateRecipe(url);
        RecipeView.render(model.state.recipe);
    }catch(err){
        if(err.message === 'Request took too long to respond!! Try Again!!')
            RecipeView.renderError(err.message);
        else
            RecipeView.renderError();
    }
};

const renderSearchResults = async function(){
    try{
        const query = SearchView.getQuery();
        if(query ==='') return;
        model.state.search.searchQuery = query;
        SearchView.buffer();
        await model.generateSearchResults(query);
        // SearchView.render(model.state.search.data);
        SearchView.render(model.createResultsPerPage(1));
        PaginationView.render(model.state.search);
    }catch(err){
        if(err.message === 'Request took too long to respond!! Try Again!!')
            SearchView.renderError(err.message);
        else
            SearchView.renderError();
    }
};

const pagination = function(goto){  
    // render results
    SearchView.render(model.createResultsPerPage(goto));    
    //render pagination controls
    PaginationView.render(model.state.search);
}

const controlServings = function(newServings){
    //Update data
    model.updateServingsData(newServings);
    //Render Updated data
    RecipeView.update(model.state.recipe);
}

const controlBookmark = function(){
    //Mark recipe as bookmarked or delete is already bookmarked;
    if(!model.state.recipe.bookmark)
        model.addBookMark();
    else    
        model.deleteBookMark();
        
    //Update recipe
    RecipeView.update(model.state.recipe);
    //Update Bookmarks list
    BookmarkView.render(model.state.bookmarked);
}

const addNewRecipe = async function(dataArr){
    try{
        //fetch recipe data
        AddNewRecipeView.buffer();
        await model.NewRecipe(dataArr);
        window.history.pushState(null, '', `#${model.state.recipe.id}`);
        setTimeout(function(){
            AddNewRecipeView.renderSuccessMsg();
        },3000);
        RecipeView.buffer();
        BookmarkView.render(model.state.bookmarked);
        BookmarkView.update(model.state.bookmarked);
        RecipeView.render(model.state.recipe);
        setTimeout(function(){
            AddNewRecipeView.toggleWindow();
        },CLOSE_MODAL_TIME_OUT*2000);
    }catch(err){
        err.message !== '' ? AddNewRecipeView.renderError(err.message) : AddNewRecipeView.renderError();
    }
}

const init = function(){
    RecipeView.renderEventHandler(renderRecipe);
    SearchView.addHandlerSearch(renderSearchResults);
    PaginationView.addHandlerPageTo(pagination);
    RecipeView.addChangeServingsHandler(controlServings);
    RecipeView.addBookmarkHandler(controlBookmark);
    BookmarkView.render(model.state.bookmarked);
    AddNewRecipeView.addHandlerUploadRecipe(addNewRecipe);
}

init();

/* document.querySelector('.search__icon').innerHTML = `<use href="${icons}#icon-search"></use>`;
document.querySelectorAll('.nav__icon')[0].innerHTML = `<use href="${icons}#icon-edit"></use>`;
document.querySelectorAll('.nav__icon')[1].innerHTML = `<use href="${icons}#icon-bookmark"></use>`; */